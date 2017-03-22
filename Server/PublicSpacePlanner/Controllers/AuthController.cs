using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PublicSpacePlanner.Authentication;
using PublicSpacePlanner.Data.Repositories;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PublicSpacePlanner.Controllers
{

    [Route("api/auth/")]
    public class AuthController : Controller
    {

		private readonly TokenProviderService _tokenProvider;
		private readonly IUserRepository _users;

		public AuthController(TokenProviderService tokenProvider, IUserRepository users)
		{
			_tokenProvider = tokenProvider;
			_users = users;
		}

		[Authorize(Roles = "user,admin")]
		[HttpGet]
		[Route("check")]
		public IActionResult CheckIfExpired(){
			//JwtAuthentication responds with 403: expired if token is expired, if the call got here, it's not expired yet.
			return Ok();
		}

        [HttpPost]
        public async Task<IActionResult> Authenticate(dynamic data)
        {	
			var username = Request.Form["username"];
			var password = Request.Form["password"];
			
			try
			{
				var id = _users.GetOneByUsername(username).Id;
				var token = await _tokenProvider.GenerateToken(username, password);
				var response = new
				{
					access_token = token,
					id = id
				};
				return new ObjectResult(response);
			}
			catch(InvalidOperationException)
			{
				return new BadRequestObjectResult("Invalid username or password.");
			}
			catch(Exception e)
			{
				return new BadRequestObjectResult(e.Message);
			}

		}

		[HttpGet]
		[Route("firsttime/{token}")]
		public async Task<IActionResult> FirstTimeLogin([FromRoute] string token)
		{
			var decoded = new JwtSecurityTokenHandler().ReadJwtToken(token);
			var id = int.Parse(decoded.Claims.Single(c => c.Type == "user id").Value);
			return Redirect("/profile/" + id);
			
		}

		[Authorize(Roles = "admin")]
		[HttpPost]
		[Route("firsttime")]
		public async Task<IActionResult> GetFirstTimeToken([FromBody]string email)
		{
			try
			{
				var res = new { token = await _tokenProvider.GenerateFirstTimeToken(email) };
				return new ObjectResult(res);
			}
			catch(Exception e)
			{
				return new BadRequestObjectResult(e.Message);
			}

		}

	}
}
