using System.Net;
using System.Text.Json;
using saitynai_backend.Exceptions;
using saitynai_backend.Models;

namespace saitynai_backend.Validators;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(httpContext, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        var response = context.Response;

        var errorResponse = new ErrorModel();

        switch (exception)
        {
            case NotFoundException notFoundException:
                response.StatusCode = (int)HttpStatusCode.NotFound;
                errorResponse.Status = response.StatusCode;
                errorResponse.Message = "Not Found";
                errorResponse.Errors = new()
                {
                    { "details", [notFoundException.Message] }
                };
                break;

            case ConflictException conflictException:
                response.StatusCode = (int)HttpStatusCode.Conflict;
                errorResponse.Status = response.StatusCode;
                errorResponse.Message = "Conflict";
                errorResponse.Errors = new()
                {
                    { "details", [conflictException.Message] }
                };
                break;

            default:
                response.StatusCode = (int)HttpStatusCode.InternalServerError;
                errorResponse.Status = response.StatusCode;
                errorResponse.Message = "An unexpected error occurred.";
                break;
        }

        var result = JsonSerializer.Serialize(errorResponse);
        await context.Response.WriteAsync(result);
    }
}
