
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlanner.Data.Models
{
    public class Rating
    {
		public int Id { get; set; }
		public User GivenBy { get; set; }
		public Blueprint Target { get; set; }
		public int Value { get; set; }
	}
}
