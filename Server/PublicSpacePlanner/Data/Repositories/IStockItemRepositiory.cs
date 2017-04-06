using PublicSpacePlanner.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlanner.Data.Repositories
{
    public interface IStockItemRepositiory
    {
		void Add(StockItem stockitem, int userId);
		IQueryable<StockItem> GetAll();
		StockItem GetOneById(int id);
		void Update(StockItem changed);
		void Remove(int id);
		void AddComment(int id, int userId, Comment comment);
		void UpdateComment(int itemId, int commentId, string message);
		void DeleteComment(int id, int commentId);

		void RateItem(int itemId, int userId, int ratingValue);
	}
}
