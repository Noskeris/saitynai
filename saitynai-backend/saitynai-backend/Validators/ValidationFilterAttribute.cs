using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using saitynai_backend.Models;

namespace saitynai_backend.Validators;

public class ValidationFilterAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (context.ModelState.IsValid) return;
        
        var isInvalidData = context.ModelState.Keys.Any(x => x.Contains("$"));

        if (isInvalidData)
        {
            var errorResponse = new ErrorModel()
            {
                Status = (int)HttpStatusCode.BadRequest,
                Message = "Invalid Request Data",
                Errors = context.ModelState
                    .Where(e => e.Value.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key, 
                        kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray())
            };

            context.Result = new BadRequestObjectResult(errorResponse);
        }
        else
        {
            var errors = context.ModelState
                .Where(e => e.Value.Errors.Count > 0)
                .ToDictionary(
                    kvp => kvp.Key, 
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray());

            var errorResponse = new ErrorModel()
            {
                Status = (int)HttpStatusCode.UnprocessableEntity,
                Message = "Unprocessable Entity",
                Errors = errors
            };

            context.Result = new UnprocessableEntityObjectResult(errorResponse);
        }
    }
}