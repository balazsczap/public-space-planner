using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PublicSpacePlanner.Data.Models;

namespace PublicSpacePlanner.Data.Repositories
{
	public class StockItemRepository : IStockItemRepositiory
	{
		private readonly SpacePlannerDbContext _context;
		public StockItemRepository(SpacePlannerDbContext context)
		{
			_context = context;
		}
		public void Add(StockItem stockitem)
		{
			//implement duplicate checking maybe
			_context.StockItems.Add(stockitem);
			_context.SaveChanges();
		}

		public IEnumerable<StockItem> GetAll()
		{
			return _context.StockItems.ToList();
		}

		public StockItem GetOneById(int id)
		{
			return _context.StockItems.Single(s => s.Id == id);
		}

		public void Remove(int id)
		{
			var removee = _context.StockItems.Single(u => u.Id == id);
			_context.Remove(removee);
			_context.SaveChanges();
		}

		public void Update(StockItem changed)
		{
			_context.StockItems.Update(changed);
			_context.SaveChanges();
		}
	}
}
