using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightReservationsApp.Migrations
{
    public partial class FlightReworked : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flight_Cities_DestinationPointId",
                table: "Flight");

            migrationBuilder.DropForeignKey(
                name: "FK_Flight_Cities_StartingPointId",
                table: "Flight");

            migrationBuilder.RenameColumn(
                name: "StartingPointId",
                table: "Flight",
                newName: "StartingCityId");

            migrationBuilder.RenameColumn(
                name: "NumberOfSeats",
                table: "Flight",
                newName: "TakenSeats");

            migrationBuilder.RenameColumn(
                name: "DestinationPointId",
                table: "Flight",
                newName: "DestinationCityId");

            migrationBuilder.RenameIndex(
                name: "IX_Flight_StartingPointId",
                table: "Flight",
                newName: "IX_Flight_StartingCityId");

            migrationBuilder.RenameIndex(
                name: "IX_Flight_DestinationPointId",
                table: "Flight",
                newName: "IX_Flight_DestinationCityId");

            migrationBuilder.AddColumn<int>(
                name: "AllSeats",
                table: "Flight",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flight_Cities_DestinationCityId",
                table: "Flight");

            migrationBuilder.DropForeignKey(
                name: "FK_Flight_Cities_StartingCityId",
                table: "Flight");

            migrationBuilder.DropColumn(
                name: "AllSeats",
                table: "Flight");

            migrationBuilder.RenameColumn(
                name: "TakenSeats",
                table: "Flight",
                newName: "NumberOfSeats");

            migrationBuilder.RenameColumn(
                name: "StartingCityId",
                table: "Flight",
                newName: "StartingPointId");

            migrationBuilder.RenameColumn(
                name: "DestinationCityId",
                table: "Flight",
                newName: "DestinationPointId");

            migrationBuilder.RenameIndex(
                name: "IX_Flight_StartingCityId",
                table: "Flight",
                newName: "IX_Flight_StartingPointId");

            migrationBuilder.RenameIndex(
                name: "IX_Flight_DestinationCityId",
                table: "Flight",
                newName: "IX_Flight_DestinationPointId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flight_Cities_DestinationPointId",
                table: "Flight",
                column: "DestinationPointId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Flight_Cities_StartingPointId",
                table: "Flight",
                column: "StartingPointId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
