using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using PublicSpacePlanner.Data;
using PublicSpacePlanner.Data.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;



namespace PublicSpacePlanner.Authentication
{
	//https://stormpath.com/blog/token-authentication-asp-net-core
	public class TokenProviderService
    {
		private readonly TokenProviderOptions _options;
		private readonly IUserRepository _userRepository;
		public TokenProviderService(
			IUserRepository repository,
			IOptions<TokenProviderOptions> options)
		{
			_userRepository = repository;
			_options = options.Value;
		}


		public async Task<string> GenerateToken(string username, string password)
		{


			var identity = await GetIdentity(username, password);
			var now = DateTime.UtcNow;

			var claims = new List<Claim>()
			{
				new Claim(JwtRegisteredClaimNames.Sub, username),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(JwtRegisteredClaimNames.Iat, now.ToUniversalTime().ToString(), ClaimValueTypes.Integer64)
			};

			claims.AddRange(identity.Claims);


			// Create the JWT and write it to a string
			var jwt = new JwtSecurityToken(
				issuer: _options.Issuer,
				audience: _options.Audience,
				claims: claims,
				notBefore: now,
				expires: now.Add(_options.Expiration),
				signingCredentials: _options.SigningCredentials);
			var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

			//var id = identity.Claims.Single(t => t.Type == "user id").Value.ToLower();

			//var response = new
			//{
			//	access_token = encodedJwt,
			//	expires_in = (int)_options.Expiration.TotalSeconds,
			//	id = id,

			//};

			return encodedJwt;
			
		}

		public async Task<string> GenerateFirstTimeToken(string email)
		{
			var user = _userRepository.GetOneByEmail(email);
			
			if (user.Active)
			{
				throw new InvalidOperationException("User is already activated");
			}

			var now = DateTime.UtcNow;
			var claims = new List<Claim>()
			{
				new Claim(JwtRegisteredClaimNames.Sub, email),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(JwtRegisteredClaimNames.Iat,  now.ToUniversalTime().ToString(), ClaimValueTypes.Integer64),
				new Claim("user id", user.Id.ToString()),
				new Claim("user activated", "false"),
				new Claim("http://schemas.microsoft.com/ws/2008/06/identity/claims/role", user.Role)

			};

			var jwt = new JwtSecurityToken(
			issuer: _options.Issuer,
			audience: _options.Audience,
			claims: claims,
			notBefore: now,
			expires: now.Add(_options.LongExpiration),
			signingCredentials: _options.SigningCredentials);
			var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

			return encodedJwt;
		}

		private Task<ClaimsIdentity> GetIdentity(string username, string password)
		{

			var user = _userRepository.GetOneByUsername(username);
			if (user == null)
			{
				return Task.FromResult<ClaimsIdentity>(null);
			}
			if (user.Active && PasswordHandler.VerifyPassword(password, user.Password))
			{
				return Task.FromResult(new ClaimsIdentity(new System.Security.Principal.GenericIdentity(username, "Token"),
					new Claim[] {
						new Claim("user id", user.Id.ToString()),
						new Claim("http://schemas.microsoft.com/ws/2008/06/identity/claims/role", user.Role)
					}));
			}

			// Credentials are invalid, or account doesn't exist
			return Task.FromResult<ClaimsIdentity>(null);
		}



	}
}
