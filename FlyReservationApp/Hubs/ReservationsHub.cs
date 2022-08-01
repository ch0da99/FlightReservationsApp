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
            string departureTime, int startingCityId, int destinationCityId, int transferCityId)
        {
            Flight newFlight = new Flight()
            {
                Agent = repository.GetAgentById(userId),
                AllSeats = allSeats,
                ArrivalTime = DateTime.Parse(arrivalTime),
                DepartureTime = DateTime.Parse(departureTime),
                StartingCity = repository.GetCityById(startingCityId),
                DestinationCity = repository.GetCityById(destinationCityId),
                Transfer = transferCityId > 0 ? repository.GetCityById(transferCityId) : null,
                Canceled = false,
                TakenSeats = 0
            };

            Flight result = repository.AddNewFlight(newFlight);
            await Clients.All.SendAsync("AddNewFlightResponse", result);
        }

        public async Task CustomerAllReservations(int userId)
        {
            List<Reservation> reservations = repository.RequestAllReservationsForCustomer(userId);
            await Clients.Caller.SendAsync("UserAllReservationsResponse", reservations);
        }

        public async Task AllActiveFlights()
        {
            List<Flight> flights = repository.RequestAllActiveFlights();
            await Clients.Caller.SendAsync("AllFlightsAvailableForReservation", flights);
        }

        public async Task NewReservation(int quantity, int userId, int flightId)
        {
            Customer customer = repository.GetCustomerById(userId);
            Flight flight = repository.GetFlightById(flightId);
            Reservation reservation = new Reservation()
            {
                Customer = customer,
                Flight = flight,
                Quantity = quantity,
            };
            Reservation result = repository.AddNewReservationRequest(reservation); 
            await Clients.All.SendAsync("NewReservationCreatedResponse", result);
        }

        public async Task NewUser(string username, string password, string role)
        {
            User user = repository.CreateNewUserRequest(username, password, role);
            await Clients.Caller.SendAsync("NewUserResponse", user);
        }

        public async Task AllFlights()
        {
            List<Flight> flights = repository.RequestAllFlights();
            await Clients.Caller.SendAsync("AllFlightsResponse", flights);
        }

        public async Task CancelFlight(int id)
        {
            int result = repository.CancelFlight(id);
            await Clients.All.SendAsync("CancelFlightResponse", result);
        }
    }
}
