using FlightReservationsApp.Hubs;
using FlyReservationApp.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightReservationsApp.Controllers
{
    public class AgentController : Controller
    {
        private readonly IHubContext<ReservationsHub> _hubContext;
        private readonly FlightReservationContext _dbContext;

        public AgentController(IHubContext<ReservationsHub> hubContext, FlightReservationContext dbContext)
        {
            _hubContext = hubContext;
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("/agentAllReservations")]
        [EnableCors("_myCorsPolicy")]
        public async Task RequestAllReservations()
        {
            User user = _dbContext.Users.Select(user => user).Where(user => user.Username == "agent" && user.Password == "agent").FirstOrDefault();
            await _hubContext.Clients.All.SendAsync("AllReservations", _dbContext.Flights.Select(t => t).FirstOrDefault());
        }
    }
}
