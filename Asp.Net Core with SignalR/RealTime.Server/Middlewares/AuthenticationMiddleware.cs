using Microsoft.IdentityModel.Tokens;
using RealTime.Server.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RealTime.Server.Middlewares
{
    public class AuthenticationMiddleware 
    {
        private readonly RequestDelegate next;
        private readonly ITokenValidatorService tokenValidatorService;

        public AuthenticationMiddleware(RequestDelegate next, ITokenValidatorService tokenService)
        {
            this.next = next;
            this.tokenValidatorService = tokenService;
        }

        public async Task Invoke(HttpContext context)
        {
            if (next != null)
            {
                string authHeader = context.Request.Headers["Authorization"];
                var audience = "http://localhost:4200";
                var issuer = "http://localhost:14297";
                var apikey = "CPYM000OLlERTASDF456Vp1OH7Xzyr7gHuw1qvUC5dcGtGPLW";

                if (authHeader != null)
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(apikey));
                    var token = authHeader.Split(" ").Last();

                    tokenHandler.ValidateToken(token, new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        IssuerSigningKey = key,
                        ValidIssuer = issuer,
                        ValidAudience = audience,

                        // set clockskew to zero so tokens expire exactly at token expiration time.

                        ClockSkew = TimeSpan.Zero
                    }, out SecurityToken validatedToken);

                    // Validate user exist in system
                    var userIdentity = this.tokenValidatorService.ValidateToken(validatedToken);
                    
                    context.User = userIdentity;                
                }               

                await next(context);
            }                      
        }
    }
}
