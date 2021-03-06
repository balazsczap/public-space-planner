﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using PublicSpacePlanner.Data.Models;
using PublicSpacePlanner.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlanner.Controllers
{
	[Route("api/stock")]
	public class StockController : Controller
	{
		private readonly IStockItemRepositiory _stock;

		public StockController(IStockItemRepositiory stock)
		{
			_stock = stock;
		}

		[Authorize(Roles = "user,admin")]
		[HttpGet]
		public IActionResult Get()
		{
			var a = _stock.GetAll()
					.Select(s => new
					{
						Id = s.Id,
						Name = s.Name,
						Description = s.Description,
						ImageUrl = s.ImageUrl,
						Creator = s.Creator,
						Width = s.Width,
						Height = s.Height,
						Ratings = s.Ratings.Sum(r => r.Value)
					})
					.ToList()
					.OrderByDescending(s => s.Ratings);


			return new ObjectResult(a);
		}

		[Authorize(Roles = "user,admin")]
		[HttpGet("{id:int}")]
		public IActionResult GetOne(int id)
		{
			var stockitem = _stock.GetOneById(id);
			if (stockitem == null)
			{
				return NotFound();
			}
			return new ObjectResult(stockitem);
		}


		[Authorize(Roles = "user,admin")]
		[HttpPost]
		public IActionResult Add([FromBody] JObject itemData)
		{
			var requester = new
			{
				Role = User.Claims.Single(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role").Value,
				Id = int.Parse(User.Claims.Single(c => c.Type == "user id").Value)
			};

			var name = itemData["name"]?.ToString();
			var description = itemData["description"]?.ToString();
			var creatorId = requester.Id;
			var imageUrl = itemData["imageUrl"]?.ToString();
			var width = itemData["width"]?.ToString();
			var height = itemData["height"]?.ToString();

			if (name == null || description == null || width == null || height == null)
				return StatusCode(400, "No name, description, or creatorId given");

			var item = new StockItem { Name = name, Description = description, ImageUrl = imageUrl, Height = int.Parse(height), Width = int.Parse(width)};

			_stock.Add(item, creatorId);


			return Created($"/stock/{item.Id}", item);

		}

		[Authorize(Roles = "user,admin")]
		[HttpPut("{id:int}")]
		public IActionResult Update([FromRoute] int id, [FromBody] JObject itemData)
		{
			var requester = new
			{
				Role = User.Claims.Single(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role").Value,
				Id = int.Parse(User.Claims.Single(c => c.Type == "user id").Value)
			};

			var name = itemData["name"]?.ToString();
			var description = itemData["description"]?.ToString();
			var imageUrl = itemData["imageUrl"]?.ToString();
			var width = itemData["width"]?.ToString();
			var height = itemData["height"]?.ToString();

			var existingItem = _stock.GetOneById(id);
			if (existingItem == null)
			{
				return NotFound();
			}

			// Users shouldn't be able to modify eachother's stock items
			if (requester.Role == "user" && existingItem.Creator.Id != requester.Id)
			{
				return StatusCode(403, "Trying to modify another user's stock item");
			}

			existingItem.Name = name ?? existingItem.Name;
			existingItem.Description = description ?? existingItem.Description;
			existingItem.ImageUrl = imageUrl ?? existingItem.ImageUrl;
			existingItem.Width = width == null ? existingItem.Width : int.Parse(width);
			existingItem.Height = height == null ? existingItem.Height : int.Parse(height);

			_stock.Update(existingItem);

			return new ObjectResult(existingItem);
		}

		[Authorize(Roles = "user,admin")]
		[HttpDelete("{id:int}")]
		public IActionResult Delete(int id)
		{
			var requester = new
			{
				Role = User.Claims.Single(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role").Value,
				Id = int.Parse(User.Claims.Single(c => c.Type == "user id").Value)
			};

			var item = _stock.GetOneById(id);
			if (item == null)
			{
				return NotFound();
			}
			// Users shouldn't be able to modify eachother's stock items
			if (requester.Role == "user" && item.Creator.Id != requester.Id)
			{
				return StatusCode(403, "Trying to delete another user's stock item");
			}
			_stock.Remove(id);
			return Ok();
		}

		[Authorize(Roles = "user,admin")]
		[HttpGet("{id:int}/comments")]
		public IActionResult GetComments([FromRoute] int id)
		{
			var item = _stock.GetOneById(id);
			if (item == null)
			{
				return NotFound();
			}
			var comment = item.Comments
				.Select(c =>
				new
				{
					Id = c.Id,
					Time = c.Time,
					Message = c.Message,
					CreatedBy = c.CreatedBy.Id,
					StockItem = c.StockItem.Id,
				});
			return new ObjectResult(comment);
		}

		[Authorize(Roles = "user,admin")]
		[HttpGet("{itemId:int}/comments/{commentId:int}")]
		public IActionResult GetOneComment([FromRoute] int itemId, [FromRoute] int commentId)
		{
			var item = _stock.GetOneById(itemId);
			if (item == null)
			{
				return NotFound();
			}

			var comment = item.Comments
				.SingleOrDefault(c => c.Id == commentId);
			if (comment == null)
			{
				return NotFound();
			}
			var simple = new
			{
				Id = comment.Id,
				Time = comment.Time,
				Message = comment.Message,
				CreatedBy = comment.CreatedBy.Id,
				StockItem = comment.StockItem.Id,
			};

			return new ObjectResult(simple);
		}



		[Authorize(Roles = "user,admin")]
		[HttpPost("{id:int}/comments")]
		public IActionResult AddComment([FromRoute] int id, [FromBody] JObject commentData)
		{
			var requester = new
			{
				Role = User.Claims.Single(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role").Value,
				Id = int.Parse(User.Claims.Single(c => c.Type == "user id").Value)
			};

			var message = commentData["message"]?.ToString();
			var userId = requester.Id;

			if (message == null)
			{
				return BadRequest();
			}

			var comment = new Comment { Message = message, Time = DateTime.Now };
			try
			{
				_stock.AddComment(id, userId, comment);
			}
			catch (InvalidOperationException)
			{
				return BadRequest();
			}

			var simple = new
			{
				Id = comment.Id,
				Time = comment.Time,
				Message = comment.Message,
				CreatedBy = comment.CreatedBy.Id,
				StockItem = comment.StockItem.Id,
			};

			return Created($"/stock/{id}/comments/{comment.Id}", simple);
		}
		[Authorize(Roles = "user,admin")]
		[HttpPut("{itemId:int}/comments/{commentId:int}")]
		public IActionResult UpdateComment([FromRoute] int itemId, [FromRoute] int commentId, [FromBody] JObject commentData)
		{
			var message = commentData["message"]?.ToString();
			if (message == null)
			{
				return BadRequest();
			}


			try
			{
				_stock.UpdateComment(itemId, commentId, message);
			}
			catch (InvalidOperationException)
			{
				return BadRequest();
			}



			return Ok();

		}

		[Authorize(Roles = "user,admin")]
		[HttpDelete("{itemId:int}/comments/{commentId:int}")]
		public IActionResult DeleteComment([FromRoute] int itemId, [FromRoute] int commentId)
		{
			try
			{
				_stock.DeleteComment(itemId, commentId);
			}
			catch (InvalidOperationException)
			{
				return BadRequest();
			}

			return Ok();
		}

		[Authorize(Roles = "user,admin")]
		[HttpPost("{itemId:int}/upvote")]
		public IActionResult UpvoteItem([FromRoute] int itemId)
		{
			var requester = new
			{
				Role = User.Claims.Single(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role").Value,
				Id = int.Parse(User.Claims.Single(c => c.Type == "user id").Value)
			};

			_stock.RateItem(itemId, requester.Id, 1);

			return Ok();
		}

		[Authorize(Roles = "user,admin")]
		[HttpPost("{itemId:int}/downvote")]
		public IActionResult DownvoteItem([FromRoute] int itemId)
		{
			var requester = new
			{
				Role = User.Claims.Single(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role").Value,
				Id = int.Parse(User.Claims.Single(c => c.Type == "user id").Value)
			};

			_stock.RateItem(itemId, requester.Id, -1);

			return Ok();
		}


	}
}
