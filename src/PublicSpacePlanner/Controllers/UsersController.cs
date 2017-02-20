using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PublicSpacePlannerDbContext.Models;

namespace PublicSpacePlannerDbContext.Controllers
{
    [Route("api/users")]
    public class UsersController : Controller
	{
		private readonly SpacePlannerDbContext context;

		public UsersController(SpacePlannerDbContext ctx)
		{
			this.context = ctx;
		}
		// GET api/users
		[HttpGet]
        public IEnumerable<User> Get()
        {
			return context.Users;
        }

        // POST api/users
        [HttpPost]
        public User Post([FromBody]string name)
        {
			var user = new User { Name = name };
			context.Add(user);
			context.SaveChanges();
			return user;
        }


    }
}
