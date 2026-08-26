using Microsoft.AspNetCore.Identity;

namespace TicketingAPI.Models
{
    public class User: IdentityUser
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string UserPassword { get; set; }
    }
}
