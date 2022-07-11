using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightReservationsApp.Migrations
{
    public partial class AgentId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flight_Users_IdAgentId",
                table: "Flight");

            migrationBuilder.RenameColumn(
                name: "IdAgentId",
                table: "Flight",
                newName: "AgentId");

            migrationBuilder.RenameIndex(
                name: "IX_Flight_IdAgentId",
                table: "Flight",
                newName: "IX_Flight_AgentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flight_Users_AgentId",
                table: "Flight",
                column: "AgentId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flight_Users_AgentId",
                table: "Flight");

            migrationBuilder.RenameColumn(
                name: "AgentId",
                table: "Flight",
                newName: "IdAgentId");

            migrationBuilder.RenameIndex(
                name: "IX_Flight_AgentId",
                table: "Flight",
                newName: "IX_Flight_IdAgentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flight_Users_IdAgentId",
                table: "Flight",
                column: "IdAgentId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
