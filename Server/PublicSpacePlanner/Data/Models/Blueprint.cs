
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlanner.Data.Models
{
    public class Blueprint
    {
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string ImageUrl { get; set; }
		public User Creator { get; set; }
		public ICollection<Rating> Ratings { get; set; } = new List<Rating>();
	}
}
