using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using PublicSpacePlanner.Data;
using PublicSpacePlanner.Data.Models;
using Microsoft.AspNetCore.Authentication;
using PublicSpacePlanner.Authentication;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.FileProviders;
using System.IO;
using PublicSpacePlanner.Data.Repositories;
using System.Diagnostics;
using System.Reflection;
using Newtonsoft.Json.Serialization;
using PublicSpacePlanner.Controllers;
using Microsoft.AspNetCore.Http;

namespace PublicSpacePlanner
{
	public class Startup
	{
		public Startup(IHostingEnvironment env)
		{

			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
				.AddEnvironmentVariables();

			Configuration = builder.Build();

		}


		public IConfigurationRoot Configuration { get; }
		//move this to a file
		private static string secretKey = "6vTpJKZLzh3VXn9WODi7xeHWMAtfqjvvifDNveNs";
		private static SymmetricSecurityKey signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{

			// Add framework services.


			var conn_str = @"User ID=besthfaxbiccvz;
							 Password=df38d546eefd1251a0925ca9a448e7a039857e32fbe4f204e62f490f1a31e2e7;
							 Host=ec2-46-137-97-169.eu-west-1.compute.amazonaws.com;
							 Port=5432;
							 Database=d4g67b4l1m0gf7;
							 Pooling=true;
							 SslMode=Require;
							 Trust Server Certificate=true;";

			services.Configure<TokenProviderOptions>(opt => { 
				opt.Audience = "PublicSpacePlanner";
				opt.Issuer = "PublicSpacePlanner";
				opt.Expiration = TimeSpan.FromMinutes(60);
				// opt.Expiration = TimeSpan.FromSeconds(15);
				opt.LongExpiration = TimeSpan.FromDays(3);
				opt.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
			});

			services.AddTransient<TokenProviderService>();
			//services.AddDbContext<SpacePlannerDbContext>(options=>)
			services.AddDbContext<SpacePlannerDbContext>(options => options.UseNpgsql(conn_str));
			services.AddTransient<IUserRepository, UserRepository>();
			services.AddTransient<IStockItemRepositiory, StockItemRepository>();
			services.AddTransient<IEventRepository, EventRepository>();
			services.AddCors();
			
			services.AddMvc().AddControllersAsServices().AddJsonOptions(options =>
			{
				options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
		{
			loggerFactory.AddConsole(Configuration.GetSection("Logging"));
			loggerFactory.AddDebug();

			if (!env.IsDevelopment())
			{
				ServeClient(app);
			}

			var tokenValidationParameters = new TokenValidationParameters
			{
				// The signing key must match!
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = signingKey,

				// Validate the JWT Issuer (iss) claim
				ValidateIssuer = true,
				ValidIssuer = "PublicSpacePlanner",

				// Validate the JWT Audience (aud) claim
				ValidateAudience = true,
				ValidAudience = "PublicSpacePlanner",

				// Validate the token expiry
				ValidateLifetime = true,

				// If you want to allow a certain amount of clock drift, set that here:
				ClockSkew = TimeSpan.Zero
			};

			app.UseJwtBearerAuthentication(new JwtBearerOptions
			{
				AutomaticAuthenticate = true,
				AutomaticChallenge = true,
				TokenValidationParameters = tokenValidationParameters
			});

			app.UseCors(builder => builder.AllowAnyOrigin());

			app.UseMvc();
		}



		private void ServeClient(IApplicationBuilder app)
		{
			Console.WriteLine($"Environment:ClientBuildPath: {Configuration["Environment:ClientBuildPath"]}");
			var clientUrl = Configuration["Environment:ClientBuildPath"];
			var clientFileProvider = new PhysicalFileProvider(clientUrl);
			Console.WriteLine($"Hosting Angular2 app from {clientUrl}");
			var filesOptions = new DefaultFilesOptions();
			filesOptions.FileProvider = clientFileProvider;
			filesOptions.DefaultFileNames.Clear();
			filesOptions.DefaultFileNames.Add("index.html");


			//this middleware directs every call that doesn't go to the API to the built Angular app
			//source: https://medium.com/@levifuller/building-an-angular-application-with-asp-net-core-in-visual-studio-2017-visualized-f4b163830eaa
			app.Use(async (context, next) =>
			{
				await next();
				if(context.Response.StatusCode==404 &&
				!Path.HasExtension(context.Request.Path.Value) &&
				!context.Request.Path.Value.StartsWith("/api/")){
					context.Request.Path = "/index.html";
					await next();
				}
			});

			app.UseDefaultFiles(filesOptions);
			app.UseStaticFiles(new StaticFileOptions
			{
				FileProvider = clientFileProvider,
				RequestPath = ""
			});
		}
	}
}
