using FlightReservationsApp.Models;
using FlyReservationApp.Models;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightReservationsApp.Hubs
{
    public class ReservationsHub : Hub
    {
        private FlightReservationsRepository repository = FlightReservationsRepository.Repository;
        public static Dictionary<int, string> connectedUsers = new Dictionary<int, string>();
        public async Task IdRequest(int userId)
        {
            connectedUsers.Add(userId, Context.ConnectionId);
            await Clients.Caller.SendAsync("IsConnected", true);
        }
        public override Task OnDisconnectedAsync(Exception exception)
        {
            try
            {
                var item = connectedUsers.First(k => k.Value == Context.ConnectionId);
                connectedUsers.Remove(item.Key);
            }
            catch (Exception)
            {

            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task AgentAllReservations()
        {
            List<Reservation> reservations = repository.RequestAllReservations();
            await Clients.All.SendAsync("AllReservationsResponse", reservations);
        }

        public async Task ApproveReservationRequest(int idReservation)
        {
            int id = repository.ApproveReservation(idReservation);
            await Clients.All.SendAsync("NewReservationApprove", id);
        }
        public async Task AllCities()
        {
            List<City> cities = repository.RequestAllCities();
            await Clients.All.SendAsync("AllCitiesResponse", cities);
        }
        public async Task AgentNewFlight(int userId, int allSeats, string arrivalTime,
            string departureTime, City startingCity, City destinationCity, City transferCity)
        {
            Flight newFlight = new Flight()
            {
                Agent = repository.GetAgentById(userId),
                AllSeats = allSeats,
                ArrivalTime = DateTime.Parse(arrivalTime),
                DepartureTime = DateTime.Parse(departureTime),
                //StartingCity = startingCity,
                //DestinationCity = startingCity,
                //Transfer = transferCity,
                Canceled = false,
                TakenSeats = 0
            };
            try
            {
                repository.AddNewFlight(newFlight);
                await Clients.Caller.SendAsync("AddNewFlightResponse", true);
                await Clients.All.SendAsync("NewFlight", newFlight);
            }
            catch (Exception)
            {
                await Clients.All.SendAsync("AddNewFlightResponse", false);
            }
        }

        public async Task UserAllReservations(int userId)
        {
            List<Reservation> reservations = repository.RequestAllReservationsForCustomer(userId);
            await Clients.Caller.SendAsync("UserAllReservationsResponse", reservations);
        }
    }
}
