
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
		public string Username { get; set; }

		[JsonIgnore]
		public string Password { get; set; }
		public string ImageUrl { get; set; } = "default_image_url";
		public ICollection<Blueprint> BlueprintsCreated { get; set; } = new List<Blueprint>();
		public ICollection<Rating> Ratings { get; set; } = new List<Rating>();
	}
}
