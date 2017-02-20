using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using PublicSpacePlannerDbContext.Models;
using Microsoft.EntityFrameworkCore;

namespace PublicSpacePlannerDbContext
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

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
			var conn_str = @"User ID=bhdqivrjgmceyz;Password=8bbb392a0e2cb5bd4fdbc797a1d18e7005036ad9cb69e31eb9e46b287e921126;Host=ec2-54-235-168-152.compute-1.amazonaws.com;Port=5432;Database=ddupm5imn2pbaj;Pooling=true;SslMode=Require;Trust Server Certificate=true;";
			services.AddDbContext<SpacePlannerDbContext>(options => options.UseNpgsql(conn_str));

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseMvc();
        }
    }
}
