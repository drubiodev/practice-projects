using System;
using System.Threading.Tasks;
using Auth.Library.BLL.Interfaces;
using Auth.Library.Models;

namespace Auth.Library.BLL
{
    public class RegisterBLL : IRegisterBLL
    {
        public Task Register(RegisterUserModel userModel)
        {
            // check if user already exist
            // generate salt
            // hash with salt
            // store in database
            // return user
            throw new NotImplementedException();
        }
    }
}