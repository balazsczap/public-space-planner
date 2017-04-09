using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PublicSpacePlanner.Data.Repositories;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PublicSpacePlanner.Controllers
{
    [Route("api/events")]
    public class EventController : Controller
    {
		private readonly IEventRepository _events;

		public EventController(IEventRepository events)
		{

			_events = events;
		}

		// GET: api/values
		[HttpGet]
        public IActionResult Get([FromQuery] int from, [FromQuery] int num)
        {
			if (num == 0) num = 10;
			return new ObjectResult(_events.GetSome(from, num).ToList());
        }


    }
}
