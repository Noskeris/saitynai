namespace saitynai_backend.Models;

public class ErrorModel
{
    public int Status { get; set; }
    public string Message { get; set; }
    public Dictionary<string,string[]> Errors { get; set; }
}