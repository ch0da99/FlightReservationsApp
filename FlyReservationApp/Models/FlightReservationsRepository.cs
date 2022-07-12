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
                .Include(r => r.Flight)
                .ThenInclude(f => f.DestinationCity)
                .Include(r => r.Flight)
                .ThenInclude(f => f.StartingCity)
                .ToList();
            return reservations;
        }
        public int ApproveReservation(int id)
        {
            try
            {
                _context.Reservations.Where(r => r.Id == id).Select(r => r).FirstOrDefault().Approved = true;
                _context.SaveChanges();
                return id;
            }
            catch
            {
                return 0;
            }
        }

    }
}
