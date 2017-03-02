using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;

namespace PublicSpacePlanner
{
    public class Program
    {
		private static readonly Dictionary<string, string> defaults =
		new Dictionary<string, string> {
			{ WebHostDefaults.EnvironmentKey, "Production" }
		};

		public static void Main(string[] args)
        {
			var config = new ConfigurationBuilder()
				.AddInMemoryCollection(defaults)
				.AddEnvironmentVariables("ASPNETCORE_")
				.AddCommandLine(args)
				.Build();

			var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
				.UseConfiguration(config)
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
