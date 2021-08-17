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
        static List<ShortUrlDetail> _DB = new List<ShortUrlDetail>();

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
            var id = GenerateShortUrl();
            var shortUrlDetails = new ShortUrlDetail { Id = id, OriginalUrl = request.Url, ShortUrl = $"https://localhost:5001/{id}" };
            _DB.Add(shortUrlDetails);

            return Ok(shortUrlDetails);
        }

        [HttpGet("/{id}")]
        public ActionResult GetShortUrl(string id)
        {
            var url = _DB.Where(w => w.Id == id).First().OriginalUrl;
            return Redirect(url);
        }
    }
}