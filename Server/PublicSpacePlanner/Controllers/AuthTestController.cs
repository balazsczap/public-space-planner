using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlanner.Controllers
{
	[Route("api/test")]
    public class AuthTestController : Controller
	{
		public AuthTestController()
		{

		}

		[Route("public")]
		[HttpGet]
		public IActionResult GetPublic()
		{

			return new ObjectResult(new { Data = "<Publicly available data>" });
		}

		[Authorize(Roles = "user,admin")]
		[Route("user")]
		[HttpGet]
		public IActionResult GetUser()
		{
			return new ObjectResult(new { Data = "<Data available for users and admins only>" });
		}

		[Authorize(Roles = "admin")]
		[Route("admin")]
		[HttpGet]
		public IActionResult GetAdmin()
		{
			return new ObjectResult(new { Data = "<Data available for admins only>" });
		}
	}
}
