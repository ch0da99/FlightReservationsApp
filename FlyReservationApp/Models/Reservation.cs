using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlyReservationApp.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public Flight Flight { get; set; }
        public User Customer { get; set; }
        public int Quantity { get; set; }
        public bool Approved { get; set; }
    }
}
