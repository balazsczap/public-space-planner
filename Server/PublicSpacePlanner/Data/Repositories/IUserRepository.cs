using PublicSpacePlanner.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlanner.Data.Repositories
{
    public interface IUserRepository
    {
		User GetOneById(int id);
		User GetOneByUsername(string username);
		User GetOneByEmail(string email);
		IEnumerable<User> GetAll();
		void Add(User user);
		void Update(User user);
		void Remove(int id);
    }
}
