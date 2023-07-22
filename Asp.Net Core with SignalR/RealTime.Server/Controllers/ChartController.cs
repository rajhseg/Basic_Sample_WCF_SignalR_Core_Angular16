using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.HttpSys;
using Microsoft.AspNetCore.SignalR;
using RealTime.Server.HugConfig;
using RealTime.Server.Models;
using System.Web.Http;
using AuthorizeAttribute = Microsoft.AspNetCore.Authorization.AuthorizeAttribute;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace RealTime.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles ="Admin")]
    public class ChartController : ControllerBase
    {
        private readonly TimerManager _timerManager;
        private readonly IHubContext<ChartHub> hubContext;

        public ChartController(TimerManager manager, IHubContext<ChartHub> hub)
        {
            this._timerManager = manager;
            this.hubContext = hub;
        }


        [Route("")]
        [HttpGet]
        public IActionResult Get()
        {            
            if (!_timerManager.IsTimerStarted)
                _timerManager.PrepareTimer(() => hubContext.Clients.All.SendAsync("TransferChartData", DataManager.GetData().ToArray()));
            
            return Ok();
        }
    }
}
