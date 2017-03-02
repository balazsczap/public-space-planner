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
            services.AddMvc();


			var conn_str = @"User ID=besthfaxbiccvz;
							 Password=df38d546eefd1251a0925ca9a448e7a039857e32fbe4f204e62f490f1a31e2e7;
							 Host=ec2-46-137-97-169.eu-west-1.compute.amazonaws.com;
							 Port=5432;
							 Database=d4g67b4l1m0gf7;
							 Pooling=true;
							 SslMode=Require;
							 Trust Server Certificate=true;";

			services.AddDbContext<SpacePlannerDbContext>(options => options.UseNpgsql(conn_str));
			services.AddSingleton<IUserRepository, UserRepository>();
			services.AddCors();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

			var tokenValidationParameters = new TokenValidationParameters
			{
				// The signing key must match!
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = signingKey,

				// Validate the JWT Issuer (iss) claim
				ValidateIssuer = true,
				ValidIssuer = "ExampleIssuer",

				// Validate the JWT Audience (aud) claim
				ValidateAudience = true,
				ValidAudience = "ExampleAudience",

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
			var options = new TokenProviderOptions
			{
				Audience = "ExampleAudience",
				Issuer = "ExampleIssuer",
				Path = "/api/auth",
				SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
			};
			app.UseMiddleware<TokenProviderMiddleware>(Options.Create(options));
			if (!env.IsDevelopment())
			{
				
				var clientFileProvider = new PhysicalFileProvider(Path.Combine(Configuration["ASPNETCORE_BASEPATH"],
					Configuration["Environment:ClientBuildPath"]));
				Console.WriteLine($"Hosting Angular2 app from {Configuration["Environment:ClientBuildPath"]}");
				var filesOptions = new DefaultFilesOptions();
				filesOptions.FileProvider = clientFileProvider;
				filesOptions.DefaultFileNames.Clear();
				filesOptions.DefaultFileNames.Add("index.html");
				app.UseDefaultFiles(filesOptions);
				app.UseStaticFiles(new StaticFileOptions
				{
					FileProvider = clientFileProvider,
					RequestPath = ""
				});

			}


			app.UseMvc();
        }
    }
}
