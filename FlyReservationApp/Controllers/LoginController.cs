using FlyReservationApp.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightReservationsApp.Controllers
{
    public class LoginController : Controller
    {
        private readonly FlightReservationContext _context;
        public LoginController(FlightReservationContext context)
        {
            _context = context;
        }
        // GET: LoginController
        [HttpPost]
        [Route("/login")]
        [EnableCors("_myCorsPolicy")]
        public IActionResult logIn(string username, string password)
        {
            User user = _context.Users.Select(user => user).Where(user => user.Username == username && user.Password == password).FirstOrDefault();
            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpGet]
        [Route("/userType/{id?}")]
        [EnableCors("_myCorsPolicy")]
        public IActionResult getType(int? id)
        {
            User user = _context.Users.Select(user => user).Where(user => user.Id == id).FirstOrDefault();
            if (user != null)
            {
                Type a = user.GetType();
                return Ok(user.GetType().Name);
            }
            else
            {
                return NoContent();
            }
        }
    }
}
