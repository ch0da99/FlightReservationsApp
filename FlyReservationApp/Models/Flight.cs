using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlyReservationApp.Models
{
    public class Flight
    {
        public int Id { get; set; }
        public Agent IdAgent { get; set; }
        public City StartingPoint { get; set; }
        public City DestinationPoint { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public int NumberOfTransfers { get; set; }
        public int NumberOfSeats { get; set; }
    }
}
