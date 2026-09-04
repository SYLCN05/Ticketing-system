using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TicketingAPI.Models;

namespace TicketingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        public readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public UserController(UserManager<User> manager)
        {
            _userManager = manager;
        }

        [HttpPost]
        public async Task<ActionResult> RegiserUser(UserRegisterModel model)
        {
            if (ModelState.IsValid) 
            {
                var newUser = new User();

                var passwordHashed = new PasswordHasher<User>()
                .HashPassword(newUser, model.Password);

                newUser.UserName = model.UserName;
                
                var result = await _userManager.CreateAsync(newUser, passwordHashed);

                if (result.Succeeded) 
                {
                    return StatusCode(201, $"New user is successvol aangemaakt gebruikersnaam: {newUser.UserName}");
                }
            }

            return BadRequest("Er is iets misgegaan tijdens het creeren van een nieuwe user vul geldige gegevens in!");
            
        }
    }
}
