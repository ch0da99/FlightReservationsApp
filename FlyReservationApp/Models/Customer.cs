using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlyReservationApp.Models
{
    public class Customer : User
    {
        public List<Reservation> Reservations { get; set; }
    }
}