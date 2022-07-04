using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlyReservationApp.Models
{
    public class Agent : User
    {
        public List<Flight> Flights { get; set; }
    }
}
