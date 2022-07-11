using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlyReservationApp.Models
{
    public class Flight
    {
        public int Id { get; set; }
        public Agent Agent { get; set; }
        public City StartingCity { get; set; }
        public City DestinationCity { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int AllSeats { get; set; }
        public int TakenSeats { get; set; }
        public bool Canceled { get; set; }
    }
}
