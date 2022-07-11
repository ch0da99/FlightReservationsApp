﻿// <auto-generated />
using System;
using FlyReservationApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FlightReservationsApp.Migrations
{
    [DbContext(typeof(FlightReservationContext))]
    [Migration("20220709133313_Discriminator_role")]
    partial class Discriminator_role
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.17");

            modelBuilder.Entity("FlyReservationApp.Models.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("FlyReservationApp.Models.Flight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("ArrivalTime")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Canceled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DepartureTime")
                        .HasColumnType("TEXT");

                    b.Property<int?>("DestinationPointId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("IdAgentId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("NumberOfSeats")
                        .HasColumnType("INTEGER");

                    b.Property<int>("NumberOfTransfers")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("StartingPointId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("DestinationPointId");

                    b.HasIndex("IdAgentId");

                    b.HasIndex("StartingPointId");

                    b.ToTable("Flight");
                });

            modelBuilder.Entity("FlyReservationApp.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Approved")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("IdCustomerId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("IdFlightId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Quantity")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("IdCustomerId");

                    b.HasIndex("IdFlightId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("FlyReservationApp.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .HasColumnType("TEXT");

                    b.Property<string>("Role")
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasDiscriminator<string>("Discriminator").HasValue("User");
                });

            modelBuilder.Entity("FlyReservationApp.Models.Agent", b =>
                {
                    b.HasBaseType("FlyReservationApp.Models.User");

                    b.HasDiscriminator().HasValue("Agent");
                });

            modelBuilder.Entity("FlyReservationApp.Models.Customer", b =>
                {
                    b.HasBaseType("FlyReservationApp.Models.User");

                    b.HasDiscriminator().HasValue("Customer");
                });

            modelBuilder.Entity("FlyReservationApp.Models.Flight", b =>
                {
                    b.HasOne("FlyReservationApp.Models.City", "DestinationPoint")
                        .WithMany()
                        .HasForeignKey("DestinationPointId");

                    b.HasOne("FlyReservationApp.Models.Agent", "IdAgent")
                        .WithMany("Flights")
                        .HasForeignKey("IdAgentId");

                    b.HasOne("FlyReservationApp.Models.City", "StartingPoint")
                        .WithMany()
                        .HasForeignKey("StartingPointId");

                    b.Navigation("DestinationPoint");

                    b.Navigation("IdAgent");

                    b.Navigation("StartingPoint");
                });

            modelBuilder.Entity("FlyReservationApp.Models.Reservation", b =>
                {
                    b.HasOne("FlyReservationApp.Models.Customer", "IdCustomer")
                        .WithMany("Reservations")
                        .HasForeignKey("IdCustomerId");

                    b.HasOne("FlyReservationApp.Models.Flight", "IdFlight")
                        .WithMany()
                        .HasForeignKey("IdFlightId");

                    b.Navigation("IdCustomer");

                    b.Navigation("IdFlight");
                });

            modelBuilder.Entity("FlyReservationApp.Models.Agent", b =>
                {
                    b.Navigation("Flights");
                });

            modelBuilder.Entity("FlyReservationApp.Models.Customer", b =>
                {
                    b.Navigation("Reservations");
                });
#pragma warning restore 612, 618
        }
    }
}
