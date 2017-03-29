
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlanner.Data.Models
{
    public class User
    {
		public int Id { get; set; }
		public string Name { get; set; }
		//[JsonIgnore]
		public string Username { get; set; }
		public string Email { get; set; }

		//role can only have user or admin, and it defaults to user for any kind of typo
		private string role = "user";
		public string Role
		{
			get { return role; }
			set {
				if (value != "admin" || value != "user")
					role = "user";
				else
					role = value;
			}
		}

		[JsonIgnore]
		public string Password { get; set; }
		public string ImageUrl { get; set; } = "default_image_url";

		public bool Active { get; set; } = false;

		public ICollection<StockItem> StockItemsCreated { get; set; } = new List<StockItem>();

		public ICollection<Rating> Ratings { get; set; } = new List<Rating>();
	}
}
