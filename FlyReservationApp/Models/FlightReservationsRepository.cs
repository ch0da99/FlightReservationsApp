using FlyReservationApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightReservationsApp.Models
{
    public class FlightReservationsRepository
    {
        private FlightReservationContext _context { get; set; }

        private static FlightReservationsRepository repository = new FlightReservationsRepository();
        public static FlightReservationsRepository Repository { get => repository; }

        public FlightReservationsRepository()
        {
            _context = new FlightReservationContext();
        }

        public User LogInUser(string username, string password)
        {
            User user = _context.Users.Select(user => user).Where(user => user.Username == username && user.Password == password).FirstOrDefault();
            return user;
        }
        public User UserRole(string username)
        {
            return _context.Users.Select(u => u).Where(u => u.Username == username).FirstOrDefault();
        }

        public List<Reservation> RequestAllReservations()
        {
            List<Reservation> reservations = _context.Reservations
                .Include(r => r.Customer)
                .Include(r => r.Flight)
                .ThenInclude(f => f.Agent)
                .ToList();
            //var a = _context.Users.Select(f => f.Agent.Flights);
            //var query = "Select Reservations.Id, Approved, Quantity, Username, " +
            //    "Flights.id,Cities.Name, DepartureTime, ArrivalTime, " +
            //    "Cities.Name, AllSeats, TakenSeats " +
            //    "from Reservations inner join Users on Reservations.CustomerId == Users.Id " +
            //    "inner join Flights on Reservations.FlightId = Flights.Id" +
            //    "inner join Cities on Flights.DestinationCityId = Cities.Id";
            //List<Reservation> reservations = _context.Reservations.FromSqlRaw(query).ToList();
            return reservations;
        }

    }
}
