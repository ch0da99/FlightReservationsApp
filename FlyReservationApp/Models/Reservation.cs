using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlyReservationApp.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public Flight IdFlight { get; set; }
        public Customer IdCustomer { get; set; }
        public int Quantity { get; set; }
        public bool Approved { get; set; }
    }
}
