using System.Reflection;
using FluentValidation;

namespace saitynai_backend.Extensions;


public static class Extensions
{
    public static void UseAutomaticValidation(this IApplicationBuilder app)
    {
        var assembly = Assembly.GetExecutingAssembly();
        var commandTypes = assembly.GetTypes()
            .Where(t => t.IsClass && !t.IsAbstract && t.Name.EndsWith("Command"));

        foreach (var commandType in commandTypes)
        {
            var validatorType = typeof(IValidator<>).MakeGenericType(commandType);
            var validator = app.ApplicationServices.GetService(validatorType) as IValidator;
            if (validator != null)
            {
                var middlewareType = typeof(ValidationMiddleware<>).MakeGenericType(commandType);
                app.UseMiddleware(middlewareType, validator);
            }
        }
    }
    
    public static void AddFluentValidation(this IServiceCollection services)
    {
        var assembly = Assembly.GetExecutingAssembly();
        services.AddValidatorsFromAssembly(assembly);
    }
}