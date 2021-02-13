using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using static URLShortener.Library.UrlValidator;

namespace URLShortener.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShortUrlController : ControllerBase
    {
        private readonly ILogger<ShortUrlController> _logger;

        public ShortUrlController(ILogger<ShortUrlController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [CheckUrl]
        public ActionResult Get()
        {
            return Ok();
        }
    }
}