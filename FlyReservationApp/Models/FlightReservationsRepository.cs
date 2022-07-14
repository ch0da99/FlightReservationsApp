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
                .Include(r => r.Flight)
                .ThenInclude(f => f.Transfer)
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

        public List<Flight> RequestAllFlightsWithNoReservationForUser(int id)
        {
            List<Flight> flights = _context.Reservations
                .Include(r => r.Customer)
                .Include(r => r.Flight)
                .Where(r => r.Customer.Id != id)
                .Select(r => r.Flight)
                .ToList();
            return flights;
        }

        public List<City> RequestAllCities()
        {
            List<City> cities = _context.Cities.AsNoTracking().ToList();
            return cities;
        }

        public User GetAgentById(int id)
        {
            User user = _context.Users.AsNoTracking().Where(u => u.Id == id).FirstOrDefault();
            return user;
        }

        public City GetCityById(int id)
        {
            City user = _context.Cities.AsNoTracking().Where(c => c.Id == id).FirstOrDefault();
            return user;
        }

        public void AddNewFlight(Flight flight)
        {
            _context.Flights.Add(flight);
            _context.SaveChanges();
        }

        public List<Reservation> RequestAllReservationsForCustomer(int id)
        {
            return _context.Reservations
                .AsNoTracking()
                .Where(u => u.Customer.Id == id)
                .Include(r => r.Flight)
                .ThenInclude(f => f.StartingCity)
                .Include(r => r.Flight)
                .ThenInclude(f => f.DestinationCity)
                .Include(r => r.Flight)
                .ThenInclude(f => f.Transfer)
                .ToList();
        }
    }
}
