using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PublicSpacePlanner.Authentication;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PublicSpacePlanner.Controllers
{
    [Route("api/auth/")]
    public class AuthController : Controller
    {

		public AuthController(TokenProviderMiddleware tokenProvider)
		{

		}

        // GET: api/values
        [HttpPost]
        public IEnumerable<string> Authenticate()
        {
            return new string[] { "value1", "value2" };
        }

    }
}
