# Framework setup

* VS2015 new project: ASP.NET Core Web Application
* global.json: sdk.version: `1.0.0-preview2-003131` 
* nuget package manager: updated all packages to 1.1
* rewrite package.json / `"dependencies"."Microsoft.NETCore.App"."version"="1.0.0"` => `"1.1.0"`
* rewrite package.json / `"frameworks"."netcoreapp1.0"` => `"frameworks"."netcoreapp1.0"`
* `Install-Package Npgsql.EntityFrameworkCore.PostgreSQL`
* `Install-Package Microsoft.AspNetCore.StaticFiles`
* add tool `"Microsoft.EntityFrameworkCore.Tools.DotNet": "1.1.0-preview4"`
* add dep: `"Microsoft.EntityFrameworkCore.Design": "1.1.0"`

# EF setup

* setup codefirst model classes: a db context, and the model classes
* wire in DbContext into Startup.cs:ConfigureServices method
* `dotnet ef migrations add <name>` into command line of project folder
* `dotnet ef database update`

# REST API setup: 

* create the controller classes (straightforward)

starting the application with `dotnet run` now permits api access for GET and POST


# Heroku

buildpack from: https://github.com/noliar/dotnet-buildpack


