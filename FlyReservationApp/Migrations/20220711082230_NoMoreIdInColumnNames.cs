using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightReservationsApp.Migrations
{
    public partial class NoMoreIdInColumnNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Flights_IdFlightId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Users_IdCustomerId",
                table: "Reservations");

            migrationBuilder.RenameColumn(
                name: "IdFlightId",
                table: "Reservations",
                newName: "FlightId");

            migrationBuilder.RenameColumn(
                name: "IdCustomerId",
                table: "Reservations",
                newName: "CustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_IdFlightId",
                table: "Reservations",
                newName: "IX_Reservations_FlightId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_IdCustomerId",
                table: "Reservations",
                newName: "IX_Reservations_CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Flights_FlightId",
                table: "Reservations",
                column: "FlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Users_CustomerId",
                table: "Reservations",
                column: "CustomerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Flights_FlightId",
                table: "Reservations");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Users_CustomerId",
                table: "Reservations");

            migrationBuilder.RenameColumn(
                name: "FlightId",
                table: "Reservations",
                newName: "IdFlightId");

            migrationBuilder.RenameColumn(
                name: "CustomerId",
                table: "Reservations",
                newName: "IdCustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_FlightId",
                table: "Reservations",
                newName: "IX_Reservations_IdFlightId");

            migrationBuilder.RenameIndex(
                name: "IX_Reservations_CustomerId",
                table: "Reservations",
                newName: "IX_Reservations_IdCustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Flights_IdFlightId",
                table: "Reservations",
                column: "IdFlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Users_IdCustomerId",
                table: "Reservations",
                column: "IdCustomerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
