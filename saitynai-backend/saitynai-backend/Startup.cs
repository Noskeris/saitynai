using System.Reflection;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using saitynai_backend.Models;
using saitynai_backend.Validators;

namespace saitynai_backend;

using Microsoft.OpenApi.Models;

public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<Context>();

        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "Event managing API", Version = "v1" });
        });

        services.AddEndpointsApiExplorer();

        services.AddCors(options =>
        {
            options.AddPolicy("AllowAnyOrigin",
                builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
        });

        services.AddMvc();
        services.AddControllers(options =>
        {
            options.Filters.Add<ValidationFilterAttribute>();
        });
        services.AddRazorPages();
        
        services.AddFluentValidationAutoValidation();

        services.AddValidatorsFromAssemblyContaining<Startup>();
        services.AddAutoMapper(typeof(Startup));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Event managing API");
        });
        
        app.UseMiddleware<ExceptionHandlingMiddleware>();

        app.UseRouting();
        app.UseHttpsRedirection();

        app.UseCors(options =>
            options.SetIsOriginAllowed(_ => true)
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithExposedHeaders("Content-Disposition"));

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapRazorPages();
        });
    }
}