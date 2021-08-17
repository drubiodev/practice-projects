using System;
using System.Threading.Tasks;
using Auth.Library.BLL.Interfaces;
using Auth.Library.Models;
using Microsoft.AspNetCore.Mvc;

namespace Auth.API.Controllers
{
    [ApiController]
    [Route("api")]
    public class Auth : ControllerBase
    {
        private readonly IRegisterBLL _bll;

        public Auth(IRegisterBLL bll)
        {
            _bll = bll;
        }

        [HttpGet("register")]
        public async Task<IActionResult> Register(RegisterUserModel userModel)
        {
            // validate model
            // register user
            await _bll.Register(userModel);

            throw new NotImplementedException();
        }
    }
}