using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlannerDbContext.Models
{
    public class SpacePlannerDbContext : DbContext
    {
		public SpacePlannerDbContext(DbContextOptions<SpacePlannerDbContext> opt)
			:base(opt)
		{
			Database.EnsureCreated();
		}

		public DbSet<User> Users { get; set; }
    }
}
