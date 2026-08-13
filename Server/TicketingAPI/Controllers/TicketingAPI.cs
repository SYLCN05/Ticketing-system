using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using TicketingAPI.Data;
using TicketingAPI.Models;

namespace TicketingAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketingAPI : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public TicketingAPI(ApplicationDBContext _context)
        {
            this._context = _context;
        }

        [HttpPut]
        [Route("Create-Ticket")]
        public async Task<IActionResult> CreateTicket(tickets ticket)
        {
            Console.WriteLine(ticket);
            if (ModelState.IsValid)
            {
                var NewTicket = await _context.tickets.AddAsync(ticket);
                await _context.SaveChangesAsync();
                
                return Ok("The new ticket has been succesfully made");
            }

            return BadRequest();

        }       
    }
}
