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

			var id = identity.Claims.Single(t => t.Type == "user id").Value.ToLower();

			var response = new
			{
				access_token = encodedJwt,
				expires_in = (int)_options.Expiration.TotalSeconds,
				id = id,
				
			};

			// Serialize and return the response
			context.Response.ContentType = "application/json";
			await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
		}
		private Task<ClaimsIdentity> GetIdentity(string username, string password)
		{

			var user = _userRepository.GetOneByUsername(username);
			if (user == null)
			{
				return Task.FromResult<ClaimsIdentity>(null);
			}
			if (PasswordHandler.VerifyPassword(password, user.Password))
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
