using FlyReservationApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightReservationsApp.Models
{
    public class Transfer
    {
        public int Id { get; set; }
        public City City { get; set; }
        public Flight Flight { get; set; }
    }
}
