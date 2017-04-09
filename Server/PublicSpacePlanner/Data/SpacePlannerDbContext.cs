using Microsoft.EntityFrameworkCore;
using PublicSpacePlanner.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace PublicSpacePlanner.Data
{
	public class SpacePlannerDbContext : DbContext
	{
		public SpacePlannerDbContext(DbContextOptions<SpacePlannerDbContext> opt)
			: base(opt)
		{
			Database.EnsureCreated();

			//Database.Migrate();

		}

		public DbSet<User> Users { get; set; }
		public DbSet<StockItem> StockItems { get; set; }
		public DbSet<Rating> Ratings { get; set; }
		public DbSet<Event> Events { get; set; }
	}
}


