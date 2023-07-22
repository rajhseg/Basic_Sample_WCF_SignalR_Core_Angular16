using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using RealTime.Server.HugConfig;
using RealTime.Server.Middlewares;
using RealTime.Server.Models;
using RealTime.Server.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApp.Models;

var builder = WebApplication.CreateBuilder(args);

var audience = "http://localhost:4200";
var issuer = "http://localhost:14297";

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder => builder
    .WithOrigins("http://localhost:4200")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());
});

builder.Services.AddAuthorization((options) =>
{
    options.AddPolicy(JwtBearerDefaults.AuthenticationScheme, policy =>
    {
        policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
        policy.RequireClaim(ClaimTypes.NameIdentifier);
    });
});

builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddTransient<ITokenValidatorService, TokenValidatorService>();
builder.Services.AddSingleton<TimerManager>();
builder.Services.AddSingleton<IUserInfoService, UserInfoService>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{
    Func<MessageReceivedContext, Task> OnMessageReceived = (MessageReceivedContext context) =>
    {
        StringValues accessToken = context.Request.Query["access_token"];

        // If the request is for our hub...
        var path = context.HttpContext.Request.Path;

        if (!string.IsNullOrEmpty(accessToken) &&
            (path.StartsWithSegments("/chart")))
        {
            // Read the token out of the query string
            context.Token = accessToken;
            context.HttpContext.Request.Headers.Add("Authorization", $"Bearer {accessToken}");
        }

        return Task.CompletedTask;
    };

    var events = new JwtBearerEvents();
    events.OnMessageReceived += OnMessageReceived;

    options.Events = events;

    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = audience,
        ValidIssuer = issuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("CPYM000OLlERTASDF456Vp1OH7Xzyr7gHuw1qvUC5dcGtGPLW"))
    };
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseRouting();

app.UseStaticFiles();

app.UseMiddleware<AuthenticationMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints => { 

    endpoints.MapControllers();
    endpoints.MapHub<ChartHub>("/chart");
});

app.Run();
