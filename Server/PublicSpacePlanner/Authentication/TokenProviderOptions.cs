using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicSpacePlanner.Authentication
{
    public class TokenProviderOptions
	{
		public string Issuer { get; set; }

		public string Audience { get; set; }

		public TimeSpan Expiration { get; set; } = TimeSpan.FromMinutes(5);

		public TimeSpan LongExpiration { get; set; } = TimeSpan.FromDays(3);

		public SigningCredentials SigningCredentials { get; set; }
	}
}
