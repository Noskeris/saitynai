namespace saitynai_backend.Models.Users;

public class AccessTokenResponse
{
    public string AccessToken { get; }
    
    public AccessTokenResponse(string accessToken)
    {
        AccessToken = accessToken;
    }
}