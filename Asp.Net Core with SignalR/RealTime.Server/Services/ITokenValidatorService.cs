using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace RealTime.Server.Services
{
    public interface ITokenValidatorService
    {
        ClaimsPrincipal ValidateToken(SecurityToken token);
    }
}
