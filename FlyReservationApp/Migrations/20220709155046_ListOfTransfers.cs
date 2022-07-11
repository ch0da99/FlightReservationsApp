using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightReservationsApp.Migrations
{
    public partial class ListOfTransfers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfTransfers",
                table: "Flight");

            migrationBuilder.AddColumn<int>(
                name: "FlightId",
                table: "Cities",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Cities_FlightId",
                table: "Cities",
                column: "FlightId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_Flight_FlightId",
                table: "Cities",
                column: "FlightId",
                principalTable: "Flight",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cities_Flight_FlightId",
                table: "Cities");

            migrationBuilder.DropIndex(
                name: "IX_Cities_FlightId",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "FlightId",
                table: "Cities");

            migrationBuilder.AddColumn<int>(
                name: "NumberOfTransfers",
                table: "Flight",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
