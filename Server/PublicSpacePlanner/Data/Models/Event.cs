using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlanner.Data.Models
{
    public class Event
    {
		public int Id { get; set; }

		private string entityType;

		public string EntityType
		{
			get { return entityType; }
			set { entityType = value; }
		}

		public int EntityId { get; set; }

		private string eventType;

		public string EventType
		{
			get { return eventType; }
			set { eventType = value; }
		}

		public DateTime Date { get; set; }


	}
}
