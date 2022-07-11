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
    [Migration("20220711104759_modelBuilderEntity")]
    partial class modelBuilderEntity
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.17");

            modelBuilder.Entity("FlightReservationsApp.Models.Transfer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("CityId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("FlightId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.HasIndex("FlightId");

                    b.ToTable("Transfers");
                });

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

                    b.Property<int?>("AgentId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("AllSeats")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("ArrivalTime")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Canceled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DepartureTime")
                        .HasColumnType("TEXT");

                    b.Property<int?>("DestinationCityId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("StartingCityId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("TakenSeats")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("AgentId");

                    b.HasIndex("DestinationCityId");

                    b.HasIndex("StartingCityId");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("FlyReservationApp.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Approved")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("CustomerId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("FlightId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Quantity")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("FlightId");

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

            modelBuilder.Entity("FlyReservationApp.Models.Administrator", b =>
                {
                    b.HasBaseType("FlyReservationApp.Models.User");

                    b.HasDiscriminator().HasValue("Administrator");
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

            modelBuilder.Entity("FlightReservationsApp.Models.Transfer", b =>
                {
                    b.HasOne("FlyReservationApp.Models.City", "City")
                        .WithMany()
                        .HasForeignKey("CityId");

                    b.HasOne("FlyReservationApp.Models.Flight", "Flight")
                        .WithMany()
                        .HasForeignKey("FlightId");

                    b.Navigation("City");

                    b.Navigation("Flight");
                });

            modelBuilder.Entity("FlyReservationApp.Models.Flight", b =>
                {
                    b.HasOne("FlyReservationApp.Models.Agent", "Agent")
                        .WithMany("Flights")
                        .HasForeignKey("AgentId");

                    b.HasOne("FlyReservationApp.Models.City", "DestinationCity")
                        .WithMany()
                        .HasForeignKey("DestinationCityId");

                    b.HasOne("FlyReservationApp.Models.City", "StartingCity")
                        .WithMany()
                        .HasForeignKey("StartingCityId");

                    b.Navigation("Agent");

                    b.Navigation("DestinationCity");

                    b.Navigation("StartingCity");
                });

            modelBuilder.Entity("FlyReservationApp.Models.Reservation", b =>
                {
                    b.HasOne("FlyReservationApp.Models.Customer", "Customer")
                        .WithMany("Reservations")
                        .HasForeignKey("CustomerId");

                    b.HasOne("FlyReservationApp.Models.Flight", "Flight")
                        .WithMany()
                        .HasForeignKey("FlightId");

                    b.Navigation("Customer");

                    b.Navigation("Flight");
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
