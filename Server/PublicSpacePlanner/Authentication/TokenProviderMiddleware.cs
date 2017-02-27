using Microsoft.AspNetCore.Http;
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
	public class TokenProviderMiddleware
    {
		private readonly RequestDelegate _next;
		private readonly TokenProviderOptions _options;
		private readonly IUserRepository _userRepository;
		public TokenProviderMiddleware(
			SpacePlannerDbContext context,
			RequestDelegate next,
			IOptions<TokenProviderOptions> options)
		{
			_userRepository = new UserRepository(context);
			_next = next;
			_options = options.Value;
		}

		public Task Invoke(HttpContext context)
		{
			// If the request path doesn't match, skip
			if (!context.Request.Path.Equals(_options.Path, StringComparison.Ordinal))
			{
				return _next(context);
			}

			// Request must be POST with Content-Type: application/x-www-form-urlencoded
			if (!context.Request.Method.Equals("POST")
			   || !context.Request.HasFormContentType)
			{
				context.Response.StatusCode = 400;
				return context.Response.WriteAsync("Bad request.");
			}

			return GenerateToken(context);
		}
		private async Task GenerateToken(HttpContext context)
		{
			var username = context.Request.Form["username"];
			var password = context.Request.Form["password"];

			var identity = await GetIdentity(username, password);
			if (identity == null)
			{
				context.Response.StatusCode = 400;
				await context.Response.WriteAsync("Invalid username or password.");
				return;
			}

			var now = DateTime.UtcNow;

			// Specifically add the jti (random nonce), iat (issued timestamp), and sub (subject/user) claims.
			// You can add other claims here, if you want:
			var claims = new Claim[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, username),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(JwtRegisteredClaimNames.Iat, now.ToUniversalTime().ToString(), ClaimValueTypes.Integer64)
			};

			// Create the JWT and write it to a string
			var jwt = new JwtSecurityToken(
				issuer: _options.Issuer,
				audience: _options.Audience,
				claims: claims,
				notBefore: now,
				expires: now.Add(_options.Expiration),
				signingCredentials: _options.SigningCredentials);
			var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

			var response = new
			{
				access_token = encodedJwt,
				expires_in = (int)_options.Expiration.TotalSeconds
			};

			// Serialize and return the response
			context.Response.ContentType = "application/json";
			await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
		}
		private Task<ClaimsIdentity> GetIdentity(string username, string password)
		{
			// DON'T do this in production, obviously!

			var user = _userRepository.GetOneByUsername(username);
			if (user == null)
			{
				return Task.FromResult<ClaimsIdentity>(null);
			}
			if (CheckHash(user.Password, password))
			{
				return Task.FromResult(new ClaimsIdentity(new System.Security.Principal.GenericIdentity(username, "Token"), new Claim[] { }));
			}

			// Credentials are invalid, or account doesn't exist
			return Task.FromResult<ClaimsIdentity>(null);
		}

		private bool CheckHash(string hash, string password)
		{
			return hash == password;
		}

	}
}
