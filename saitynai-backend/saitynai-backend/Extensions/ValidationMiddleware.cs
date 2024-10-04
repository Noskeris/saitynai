using FluentValidation;

namespace saitynai_backend.Extensions;

public class ValidationMiddleware<TCommand>
{
    private readonly RequestDelegate _next;
    private readonly IValidator<TCommand> _validator;

    public ValidationMiddleware(RequestDelegate next, IValidator<TCommand> validator)
    {
        _next = next;
        _validator = validator;
    }

    public async Task Invoke(HttpContext context)
    {
        if (context.Request.Method == HttpMethods.Put && context.Request.Path.HasValue)
        {
            var command = await context.Request.ReadFromJsonAsync<TCommand>();

            if (command == null)
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsync("Invalid JSON.");
                return;
            }
            
            var validationResult = await _validator.ValidateAsync(command);
            if (!validationResult.IsValid)
            {
                var errorMessages = string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage));
                context.Response.StatusCode = StatusCodes.Status422UnprocessableEntity;
                await context.Response.WriteAsync(errorMessages);
                return;
            }
        }

        await _next(context);
    }
}
