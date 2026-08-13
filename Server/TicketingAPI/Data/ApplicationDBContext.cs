using Microsoft.EntityFrameworkCore;
using TicketingAPI.Models;

namespace TicketingAPI.Data
{
    public class ApplicationDBContext: DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) :base(options)
        {
        }

        public DbSet<tickets> tickets { get; set; }
    }
}
