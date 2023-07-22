using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace RealTime.Server.HugConfig
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles ="Admin")]
    public class ChartHub : Hub
    {
        public Task SendToCaller(string username)
        {
            return this.Clients.Caller.SendAsync("callback", new object[] { "aaa", "bb", username });
        }
    }
}
