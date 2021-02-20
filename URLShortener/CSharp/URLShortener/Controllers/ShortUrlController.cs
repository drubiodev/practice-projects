using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using URLShortener.Entities;
using URLShortener.Library;
using URLShortener.Models;
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
        public ActionResult UrlShortener([FromBody] UrlShortenerRequest request)
        {
            if (!UrlValidator.IsValid(request.Url))
            {
                return BadRequest("Not a valid URL");
            }

            return Ok(new ShortUrlDetail { OriginalUrl = request.Url, ShortUrl = $"https://localhost:5001/api/ShortUrl/{GenerateShortUrl()}" });
        }
    }
}