using FlyReservationApp.Models;
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
        public string Login(string username, string password)
        {
            User user = _context.Users.Select(user => user).Where(user => user.Username == username && user.Password == password).FirstOrDefault();
            string a = Newtonsoft.Json.JsonConvert.SerializeObject(user);
            return Newtonsoft.Json.JsonConvert.SerializeObject(user);
        }
    }
}
