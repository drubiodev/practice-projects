using System.Threading.Tasks;
using Auth.Library.Models;

namespace Auth.Library.BLL.Interfaces
{
    public interface IRegisterBLL
    {
         Task Register(RegisterUserModel userModel);
    }
}