using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApp.Models;

namespace RealTime.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUserInfoService _userInfoService;

        const string audience = "http://localhost:4200";
        const string issuer = "http://localhost:14297";

        public LoginController(IUserInfoService userInfoService)
        {
            _userInfoService = userInfoService; 
        }

        [HttpPost]
        public IActionResult Post([FromBody]UserInfo userInfo)
        {
            if (userInfo == null)
            {
                return BadRequest();
            }

            var data = this._userInfoService.GetUserInfo(userInfo.UserName);

            if (data == null || data.Password != userInfo.Password)
            {
                return Unauthorized();
            }

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, data.UserName),
                new Claim(ClaimTypes.NameIdentifier, data.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            authClaims.Add(new Claim(ClaimTypes.Role, data.Role));

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("CPYM000OLlERTASDF456Vp1OH7Xzyr7gHuw1qvUC5dcGtGPLW"));

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                expires: DateTime.UtcNow.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            Response.Cookies.Append("access_token", jwtToken, new CookieOptions()
            {
                HttpOnly = true,
                Path = "/",
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(3),
            });

            return Ok();
        }
    }
}
