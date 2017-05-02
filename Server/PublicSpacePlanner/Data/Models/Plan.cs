using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlanner.Data.Models
{
    public class Plan
    {
		public int Id { get; set; }
		public User Creator { get; set; }
		public string PlanData { get; set; } = "";
    }
}
