using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace prod.Migrations
{
    /// <inheritdoc />
    public partial class AddedDvnContListTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DvnContList",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DevaningNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ContainerNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Renban = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SuppilerNo = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ShiftNo = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    WorkingDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PlanDevaningDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActDevaningDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActDevaningDateFinish = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DevaningType = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    DevaningStatus = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DvnContList", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DvnContList");
        }
    }
}
