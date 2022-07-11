using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightReservationsApp.Migrations
{
    public partial class UpdatedContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flight_Cities_DestinationCityId",
                table: "Flight");

            migrationBuilder.DropForeignKey(
                name: "FK_Flight_Cities_StartingCityId",
                table: "Flight");

            migrationBuilder.DropForeignKey(
                name: "FK_Flight_Users_AgentId",
                table: "Flight");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Flight_IdFlightId",
                table: "Reservations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Flight",
                table: "Flight");

            migrationBuilder.RenameTable(
                name: "Flight",
                newName: "Flights");

            migrationBuilder.RenameIndex(
                name: "IX_Flight_StartingCityId",
                table: "Flights",
                newName: "IX_Flights_StartingCityId");

            migrationBuilder.RenameIndex(
                name: "IX_Flight_DestinationCityId",
                table: "Flights",
                newName: "IX_Flights_DestinationCityId");

            migrationBuilder.RenameIndex(
                name: "IX_Flight_AgentId",
                table: "Flights",
                newName: "IX_Flights_AgentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Flights",
                table: "Flights",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Transfers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CityId = table.Column<int>(type: "INTEGER", nullable: true),
                    FlightId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transfers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Transfers_Cities_CityId",
                        column: x => x.CityId,
                        principalTable: "Cities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Transfers_Flights_FlightId",
                        column: x => x.FlightId,
                        principalTable: "Flights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transfers_CityId",
                table: "Transfers",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Transfers_FlightId",
                table: "Transfers",
                column: "FlightId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_Cities_DestinationCityId",
                table: "Flights",
                column: "DestinationCityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_Cities_StartingCityId",
                table: "Flights",
                column: "StartingCityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_Users_AgentId",
                table: "Flights",
                column: "AgentId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Flights_IdFlightId",
                table: "Reservations",
                column: "IdFlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flights_Cities_DestinationCityId",
                table: "Flights");

            migrationBuilder.DropForeignKey(
                name: "FK_Flights_Cities_StartingCityId",
                table: "Flights");

            migrationBuilder.DropForeignKey(
                name: "FK_Flights_Users_AgentId",
                table: "Flights");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservations_Flights_IdFlightId",
                table: "Reservations");

            migrationBuilder.DropTable(
                name: "Transfers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Flights",
                table: "Flights");

            migrationBuilder.RenameTable(
                name: "Flights",
                newName: "Flight");

            migrationBuilder.RenameIndex(
                name: "IX_Flights_StartingCityId",
                table: "Flight",
                newName: "IX_Flight_StartingCityId");

            migrationBuilder.RenameIndex(
                name: "IX_Flights_DestinationCityId",
                table: "Flight",
                newName: "IX_Flight_DestinationCityId");

            migrationBuilder.RenameIndex(
                name: "IX_Flights_AgentId",
                table: "Flight",
                newName: "IX_Flight_AgentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Flight",
                table: "Flight",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Flight_Cities_DestinationCityId",
                table: "Flight",
                column: "DestinationCityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Flight_Cities_StartingCityId",
                table: "Flight",
                column: "StartingCityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Flight_Users_AgentId",
                table: "Flight",
                column: "AgentId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservations_Flight_IdFlightId",
                table: "Reservations",
                column: "IdFlightId",
                principalTable: "Flight",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
