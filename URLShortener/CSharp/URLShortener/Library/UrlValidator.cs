using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace URLShortener.Library
{
    public sealed class UrlValidator
    {
        public static bool IsValid(string url)
        {
            Uri uriResult;

            bool result = Uri.TryCreate(url, UriKind.Absolute, out uriResult)
                 && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);

            if (result)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static string GenerateShortUrl()
        {
            string urlsafe = string.Empty;
            Enumerable.Range(48, 75)
              .Where(i => i < 58 || i > 64 && i < 91 || i > 96)
              .OrderBy(o => new Random().Next())
              .ToList()
              .ForEach(i => urlsafe += Convert.ToChar(i));
            string token = urlsafe.Substring(new Random().Next(0, urlsafe.Length), new Random().Next(2, 6));

            return token;

        }
    }
}