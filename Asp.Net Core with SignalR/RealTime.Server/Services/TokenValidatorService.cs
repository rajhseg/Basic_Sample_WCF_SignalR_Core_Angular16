using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebApp.Models;

namespace RealTime.Server.Services
{
    public class TokenValidatorService : ITokenValidatorService
    {
        private readonly IUserInfoService userInfoService;

        public TokenValidatorService(IUserInfoService userInfoService)
        {
            this.userInfoService = userInfoService;
        }

        public ClaimsPrincipal ValidateToken(SecurityToken token)
        {
            if (token != null)
            {
                var jwtToken = (JwtSecurityToken)token;

                var userId = jwtToken.Claims.First(x => x.Type == JwtRegisteredClaimNames.Jti).Value;
                var name = jwtToken.Claims.First(x => x.Type == ClaimTypes.Name).Value;
                var role = jwtToken.Claims.First(x => x.Type == ClaimTypes.Role).Value;

                /* Validate the token and user id exist in system */
                var model = GetUserFromSystem(name, jwtToken);
                
                var claims = new[]
                                {
                                        new Claim(ClaimTypes.Sid, userId),
                                        new Claim(ClaimTypes.Name, model.UserName),
                                        new Claim(ClaimTypes.Role, model.Role),
                                    };

                var identity = new ClaimsIdentity(claims, "basic");

                return new ClaimsPrincipal(identity);
            }

            throw new Exception("Not a valid token");
        }

        private UserInfo GetUserFromSystem(string userId, JwtSecurityToken token)
        {
            if(userId!=null && token != null)
            {
                var data = this.userInfoService.GetUserInfo(userId);
                return new UserInfo { Role = data.Role, UserName = data.UserName };
            }

            throw new Exception("User not exist in system");
        }
    }

    public class UserModel
    {
        public string Id { get; set; }

        public string Name { get; set; }
    }
}
