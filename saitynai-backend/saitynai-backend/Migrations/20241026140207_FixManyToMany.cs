using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace saitynai_backend.Migrations
{
    /// <inheritdoc />
    public partial class FixManyToMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_TimeSlots_TimeSlotId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_TimeSlotId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "TimeSlotId",
                table: "AspNetUsers");

            migrationBuilder.CreateTable(
                name: "TimeSlotUser",
                columns: table => new
                {
                    ParticipantsId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TimeSlotId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeSlotUser", x => new { x.ParticipantsId, x.TimeSlotId });
                    table.ForeignKey(
                        name: "FK_TimeSlotUser_AspNetUsers_ParticipantsId",
                        column: x => x.ParticipantsId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TimeSlotUser_TimeSlots_TimeSlotId",
                        column: x => x.TimeSlotId,
                        principalTable: "TimeSlots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TimeSlotUser_TimeSlotId",
                table: "TimeSlotUser",
                column: "TimeSlotId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimeSlotUser");

            migrationBuilder.AddColumn<int>(
                name: "TimeSlotId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_TimeSlotId",
                table: "AspNetUsers",
                column: "TimeSlotId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_TimeSlots_TimeSlotId",
                table: "AspNetUsers",
                column: "TimeSlotId",
                principalTable: "TimeSlots",
                principalColumn: "Id");
        }
    }
}
