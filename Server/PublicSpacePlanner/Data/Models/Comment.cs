using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlanner.Data.Models
{
    public class Comment
    {
		public int Id { get; set; }
		public DateTime Time { get; set; }
		public string Message { get; set; }
		public User CreatedBy { get; set; }
		public StockItem StockItem { get; set; }
	}
}
