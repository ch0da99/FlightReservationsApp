using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightReservationsApp.Migrations
{
    public partial class OneTransferOnly : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cities_Flights_FlightId",
                table: "Cities");

            migrationBuilder.DropTable(
                name: "Transfers");

            migrationBuilder.DropIndex(
                name: "IX_Cities_FlightId",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "FlightId",
                table: "Cities");

            migrationBuilder.AddColumn<int>(
                name: "TransferId",
                table: "Flights",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Flights_TransferId",
                table: "Flights",
                column: "TransferId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_Cities_TransferId",
                table: "Flights",
                column: "TransferId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flights_Cities_TransferId",
                table: "Flights");

            migrationBuilder.DropIndex(
                name: "IX_Flights_TransferId",
                table: "Flights");

            migrationBuilder.DropColumn(
                name: "TransferId",
                table: "Flights");

            migrationBuilder.AddColumn<int>(
                name: "FlightId",
                table: "Cities",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Transfers",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CityId = table.Column<int>(type: "INTEGER", nullable: true),
                    FlightId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transfers", x => x.id);
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
                name: "IX_Cities_FlightId",
                table: "Cities",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_Transfers_CityId",
                table: "Transfers",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Transfers_FlightId",
                table: "Transfers",
                column: "FlightId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_Flights_FlightId",
                table: "Cities",
                column: "FlightId",
                principalTable: "Flights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
