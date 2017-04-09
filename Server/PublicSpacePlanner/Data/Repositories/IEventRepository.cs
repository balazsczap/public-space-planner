using PublicSpacePlanner.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlanner.Data.Repositories
{
    public interface IEventRepository
    {
		IQueryable<Event> GetSome(int from, int to);
    }
}
