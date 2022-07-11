using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightReservationsApp.Migrations
{
    public partial class CustomerAndAgentToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustomerId1",
                table: "Reservations",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AgentId1",
                table: "Flights",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservations_CustomerId1",
                table: "Reservations",
                column: "CustomerId1");

            migrationBuilder.CreateIndex(
                name: "IX_Flights_AgentId1",
                table: "Flights",
                column: "AgentId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_Users_AgentId1",
                table: "Flights",
                column: "AgentId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Users_CustomerId1",
                table: "Reservations",
                column: "CustomerId1",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flights_Users_AgentId1",
                table: "Flights");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Users_CustomerId1",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Reservations_CustomerId1",
                table: "Reservations");

            migrationBuilder.DropIndex(
                name: "IX_Flights_AgentId1",
                table: "Flights");

            migrationBuilder.DropColumn(
                name: "CustomerId1",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "AgentId1",
                table: "Flights");
        }
    }
}
