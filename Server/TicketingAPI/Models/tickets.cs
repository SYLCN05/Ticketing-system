namespace TicketingAPI.Models
{
    public class tickets
    {
        public int id { get; set; }
        public string ticket_title { get; set; }
        public string ticket_description { get; set; }
        public DateTime ticket_turnin_date { get; set; } = DateTime.UtcNow;  
    }
}
