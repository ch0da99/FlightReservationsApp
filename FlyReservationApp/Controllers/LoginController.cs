using FlightReservationsApp.Models;
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
        private readonly FlightReservationsRepository repository = FlightReservationsRepository.Repository;
        [HttpPost]
        [Route("/login")]
        [EnableCors("_myCorsPolicy")]
        public IActionResult LogIn(string username, string password)
        {
            User user = repository.LogInUser(username,password);
            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return NoContent();
            }
        }

        [HttpPost]
        [Route("/userType")]
        [EnableCors("_myCorsPolicy")]
        public IActionResult GetType(string username)
        {
            User user = repository.UserRole(username);
            if (user != null)
            {
                return Ok(user.GetType().Name);
            }
            else
            {
                return NoContent();
            }
        }
    }
}
