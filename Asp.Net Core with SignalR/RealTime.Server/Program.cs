using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(JwtBearerDefaults.AuthenticationScheme, policy =>
    {
        policy.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme);
        policy.RequireAuthenticatedUser();
    });
});

builder.Services.AddSignalR();

builder.Services.AddControllersWithViews();

builder.Services.AddScoped<CustomAntiForgeryFilter>();
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
        StringValues accessToken = context.Request.Cookies["access_token"];
        var path = context.HttpContext.Request.Path;

        if (!string.IsNullOrEmpty(accessToken))
        {
            context.Token = accessToken;
        }

        return Task.CompletedTask;
    };

    var events = new JwtBearerEvents();
    events.OnMessageReceived += OnMessageReceived;

    // uncomment the following line to enable the events for adding token to the request header for SignalR requests
    // options.Events = events;

    options.SaveToken = true;
    options.RequireHttpsMetadata = !builder.Environment.IsDevelopment();
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidAudience = audience,
        ValidIssuer = issuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("CPYM000OLlERTASDF456Vp1OH7Xzyr7gHuw1qvUC5dcGtGPLW"))
    };
});


builder.Services.AddAntiforgery(t =>
{
    t.HeaderName = "A_xsrf_token";
    t.Cookie.Name = "__Host-AntiForgery";
    t.Cookie.HttpOnly = true;
    t.Cookie.SecurePolicy = builder.Environment.IsDevelopment() ? CookieSecurePolicy.SameAsRequest : CookieSecurePolicy.Always;
    t.Cookie.SameSite = SameSiteMode.None;
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors("CorsPolicy");
app.UseRouting();
app.UseStaticFiles();
app.UseMiddleware<AuthenticationMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChartHub>("/chart");


app.MapGet("/api/antiforgery/token",
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
(IAntiforgery antiforgery, HttpContext context) =>
    {
        var tokens = antiforgery.GetAndStoreTokens(context);

        return Results.Ok(new{ FAQ = tokens.RequestToken });
    });

app.Run();
