using PublicSpacePlanner.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PublicSpacePlanner.Data.Models;

namespace PublicSpacePlanner.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
		private readonly SpacePlannerDbContext _context;

		public UserRepository(SpacePlannerDbContext context)
		{
			_context = context;
		}
		public void Add(User user)
		{
			var exist = _context.Users.FirstOrDefault(u=>u.Email==user.Email);
			if (exist != null)
			{
				throw new InvalidOperationException("User already exists");
			}
			_context.Users.Add(user);
			_context.SaveChanges();
		}

		public IEnumerable<User> GetAll()
		{
			return _context.Users.ToList();
		}

		public User GetOneById(int id)
		{
			return _context.Users.Single(u => u.Id == id);
		}

		public User GetOneByUsername(string username)
		{
			return _context.Users.Single(u => u.Username == username);
		}

		public User GetOneByEmail(string email)
		{
			return _context.Users.Single(u => u.Email == email);
		}

		public void Remove(int id)
		{
			var e = _context.Users.Single(u => u.Id == id);
			_context.Remove(e);
			_context.SaveChanges();
		}

		public void Update(User userData)
		{
			_context.Users.Update(userData);
			_context.SaveChanges();
		}

	}
}
