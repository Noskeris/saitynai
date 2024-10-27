namespace saitynai_backend.Models.Organizations;

public class OrganizationResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ContactInfo { get; set; }
    public string Address { get; set; }
    public string Website { get; set; }
    public bool IsNonProfit { get; set; }
}