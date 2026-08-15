using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketingAPI.Data;
using TicketingAPI.Models;
using TicketingAPI.Services;

namespace TicketingAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TicketingAPI : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private TicketAIService _ticketAIService;
        public TicketingAPI(ApplicationDBContext context, TicketAIService aiService )
        {
            _context = context;
            _ticketAIService = aiService;
        }

        [HttpPut]
        [Route("Create-Ticket")]
        public async Task<IActionResult> CreateTicket(tickets ticket)
        {
            Console.WriteLine(ticket);
            if (ModelState.IsValid)
            {
                var ticketAnalyzationResult = await _ticketAIService.AnalyzeTicketPriority(ticket.ticket_title, ticket.ticket_description);

                var newTicket = new tickets
                {
                    ticket_title = ticket.ticket_title,
                    ticket_description = ticket.ticket_description,
                    ticket_priority = ticketAnalyzationResult.Priority
                };

                await _context.tickets.AddAsync(newTicket);
                await _context.SaveChangesAsync();
                
                return Ok("The new ticket has been succesfully made");
            }

            return BadRequest();

        }

        [HttpGet]
        [Route("Get-Tickets")]
        public async Task<ActionResult<List<tickets>>> GetTickets()
        {
            return await _context.tickets.ToListAsync();
        }
    }
}
