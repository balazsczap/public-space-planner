using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PublicSpacePlanner.Data.Repositories;
using Newtonsoft.Json.Linq;
using System.Dynamic;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PublicSpacePlanner.Controllers
{
    [Route("api/events")]
    public class EventController : Controller
    {
		private readonly IEventRepository _events;
		private readonly IUserRepository _users;
		private readonly IStockItemRepositiory _stock;

		public EventController(IEventRepository events, IUserRepository users, IStockItemRepositiory stock)
		{

			_events = events;
			_users = users;
			_stock = stock;
		}

		// GET: api/values
		[HttpGet]
        public IActionResult Get([FromQuery] int from, [FromQuery] int num)
        {
			var result = _events.GetSome(from, num == 0 ? 10 : num).ToList();

			var list = new List<ExpandoObject>();
			
			result.ForEach(r =>
			{
				dynamic e = new ExpandoObject();
				
				e.id = r.Id;
				e.eventType = r.EventType;
				e.entityType = r.EntityType;
				e.date = r.Date;
				switch (r.EntityType)
				{
					case "user":
						try
						{
							var entity = _users.GetOneById(r.EntityId);
							e.entity = new
							{
								id = entity.Id,
								name = entity.Name
							};
						}
						catch
						{
							e.entity = null;
						}
						break;

					case "stock":
						try
						{
							var entity = _stock.GetOneById(r.EntityId);
							e.entity = new
							{
								id = entity.Id,
								name = entity.Name,
								creator = new
								{
									id = entity.Creator.Id,
									name = entity.Creator.Name
								}
							};
						}
						catch
						{
							e.entity = null;
						}
						break;
				}
				list.Add(e);
							
			});

			return new ObjectResult(list);
		}


    }
}
