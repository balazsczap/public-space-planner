using PublicSpacePlanner.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlanner.Data.Repositories
{
    interface IStockItemRepositiory
    {
		void Add(StockItem stockitem);
		IEnumerable<StockItem> GetAll();
		StockItem GetOneById(int id);
		void Update(StockItem changed);
		void Remove(int id);
    }
}
