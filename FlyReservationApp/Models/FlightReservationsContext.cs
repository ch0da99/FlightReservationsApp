using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlyReservationApp.Models
{
    public class FlightReservationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Flight> Flight { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        public FlightReservationContext(DbContextOptions<FlightReservationContext> options)
        : base(options)
        {
        }
    }
}
