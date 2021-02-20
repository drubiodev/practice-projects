using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Http;

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
            Guid g = Guid.NewGuid();
            string guidString = Convert.ToBase64String(g.ToByteArray());
            guidString = guidString.Replace("=", "");
            guidString = guidString.Replace("+", "");

            return guidString;
        }
    }
}