using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BCrypt.Net;
namespace PublicSpacePlanner.Authentication
{
    public static class PasswordHandler
    {

		public static string HashPassword(string password)
		{
			return BCrypt.Net.BCrypt.HashPassword(password);
		}

		public static bool VerifyPassword(string text, string hashed)
		{
			return BCrypt.Net.BCrypt.Verify(text, hashed);
		}
    }
}
