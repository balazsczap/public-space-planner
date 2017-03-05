using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PublicSpacePlanner.Data;
using PublicSpacePlanner.Data.Models;
using PublicSpacePlanner.Data.Repositories;
using Newtonsoft.Json.Linq;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using PublicSpacePlanner.Authentication;

namespace PublicSpacePlanner.Controllers
{
	[Route("api/users")]
	public class UsersController : Controller
	{
		private readonly IUserRepository _users;

		public UsersController(IUserRepository users)
		{

			_users = users;
		}
		// GET api/users

		[HttpGet]
		public IEnumerable<User> Get()
		{
			return _users.GetAll();
		}

		[HttpGet("{id:int}")]
		public IActionResult GetOne(int id)
		{
			var user = _users.GetOneById(id);
			if (user == null)
			{
				return NotFound();
			}
			return new ObjectResult(user);
		}


		// POST api/users
		[HttpPost]
		public IActionResult Add([FromBody] JObject userData)
		{
			var name = userData["name"]?.ToString();
			var username = userData["username"]?.ToString();
			var password = userData["password"]?.ToString();
			var role = userData["role"]?.ToString();
			var imgUrl = userData["imageUrl"]?.ToString();


			if (name == null || username == null || password == null)
				return StatusCode(400, "No name, username, or password given");

			var otherUser = _users.GetOneByUsername(username);
			if (otherUser != null)
			{
				return StatusCode(409, "A User with this username already exists");
			}

			var hashed = PasswordHandler.HashPassword(password);
			var user = new User { Name = name, Username = username, Password = hashed };
			user.ImageUrl = imgUrl ?? user.ImageUrl;
			user.Role = role ?? user.Role;

			_users.Add(user);

			

			return Created($"/users/{user.Id}", user);
		}

		[HttpPut("{id:int}")]
		public IActionResult Update([FromRoute]int id, [FromBody] JObject userData)
		{
			var name = userData["name"]?.ToString();
			var username = userData["username"]?.ToString();
			var password = userData["password"]?.ToString();
			var imgUrl = userData["imageUrl"]?.ToString();
			var role = userData["role"]?.ToString();

			var user = _users.GetOneById(id);
			if (user == null)
			{
				return NotFound();
			}



			user.Name = name ?? user.Name;
			user.Username = username ?? user.Username;
			if (password != null)
			{
				var hashed = PasswordHandler.HashPassword(password);
				user.Password = hashed ?? user.Password;
			}
			user.ImageUrl = imgUrl ?? user.ImageUrl;
			user.Role = role ?? user.Role;

			_users.Update(user);
			return Ok();

		}

		[HttpDelete("{id:int}")]
		public void Delete(int id)
		{
			_users.Remove(id);
		}


		


    }
}
