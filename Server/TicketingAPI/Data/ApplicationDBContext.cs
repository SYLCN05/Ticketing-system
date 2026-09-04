using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TicketingAPI.Models;

namespace TicketingAPI.Data
{
    public class ApplicationDBContext: IdentityDbContext<User, IdentityRole, string>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) :base(options)
        {
        }

        public DbSet<tickets> tickets { get; set; }
    }
}
