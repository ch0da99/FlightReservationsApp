﻿using FlightReservationsApp.Models;
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
        public async Task IDresponse(int userId)
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
    }
}
