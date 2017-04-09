using PublicSpacePlanner.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlanner.Data.Repositories
{
    public class EventRepository : IEventRepository
	{
		private readonly SpacePlannerDbContext _context;

		public EventRepository(SpacePlannerDbContext context)
		{
			_context = context;
		}

		public IQueryable<Event> GetSome(int from, int num)
		{
			return _context.Events
				.Skip(from)
				.Take(num);
		}
	}
}
