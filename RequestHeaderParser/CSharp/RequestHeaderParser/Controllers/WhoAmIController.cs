using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Net.Http.Headers;
using RequestHeaderParser.Entities;

namespace RequestHeaderParser.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WhoAmIController : ControllerBase
    {
        private readonly ILogger<WhoAmIController> _logger;

        public WhoAmIController(ILogger<WhoAmIController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<RequestHeader> Get()
        {
            var requestHeaders = new RequestHeader
            {
                Ipaddress = Dns.GetHostAddresses(Dns.GetHostName())[4].ToString(),
                Language = Request.Headers[HeaderNames.AcceptLanguage].ToString(),
                Software = Request.Headers[HeaderNames.UserAgent].ToString()
            };
            return Ok(requestHeaders);
        }
    }
}
