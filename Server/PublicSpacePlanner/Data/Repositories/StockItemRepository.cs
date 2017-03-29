﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PublicSpacePlanner.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace PublicSpacePlanner.Data.Repositories
{
	public class StockItemRepository : IStockItemRepositiory
	{
		private readonly SpacePlannerDbContext _context;
		public StockItemRepository(SpacePlannerDbContext context)
		{
			_context = context;
		}
		public void Add(StockItem stockitem, int userId)
		{
			//implement duplicate checking maybe
			var user = _context.Users.Single(u => u.Id == userId);
			stockitem.Creator = user;
			user.StockItemsCreated.Add(stockitem);
			_context.StockItems.Add(stockitem);
			_context.Users.Update(user);
			_context.SaveChanges();
		}

		public IEnumerable<StockItem> GetAll()
		{
			return _context.StockItems.Include(u => u.Creator);
		}

		public StockItem GetOneById(int id)
		{
			return _context.StockItems
				.Include(s => s.Creator)
				.Include(s => s.Comments)
				.SingleOrDefault(s => s.Id == id);
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

		public void AddComment(int id, int userId, Comment comment)
		{
			var user = _context.Users
				.Single(u => u.Id == userId);

			comment.CreatedBy = user;

			var item = _context.StockItems
				.Include(s=>s.Comments)
				.Single(s => s.Id == id);

			item.Comments.Add(comment);
			_context.StockItems.Update(item);
			_context.SaveChanges();
		}

		public void UpdateComment(int itemId, int commentId, string message)
		{
			var item = _context.StockItems
				.Include(s => s.Comments)
				.Single(s => s.Id == itemId);
			var comment = item.Comments.Single(c => c.Id == commentId);
			comment.Message = message;
			_context.StockItems.Update(item);
			_context.SaveChanges();
			
		}

		public void DeleteComment(int itemId, int commentId)
		{
			var item = _context.StockItems
				.Include(s => s.Comments)
				.Single(s => s.Id == itemId);
			var comment = item.Comments.Single(c => c.Id == commentId);

			item.Comments.Remove(comment);

			_context.StockItems.Update(item);
			_context.SaveChanges();
		}
	}
}
