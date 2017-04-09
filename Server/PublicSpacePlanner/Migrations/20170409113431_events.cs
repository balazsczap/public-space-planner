using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PublicSpacePlanner.Migrations
{
    public partial class events : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_StockItems_OnItemId",
                table: "Comment");

            migrationBuilder.RenameColumn(
                name: "OnItemId",
                table: "Comment",
                newName: "StockItemId");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_OnItemId",
                table: "Comment",
                newName: "IX_Comment_StockItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_StockItems_StockItemId",
                table: "Comment",
                column: "StockItemId",
                principalTable: "StockItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_StockItems_StockItemId",
                table: "Comment");

            migrationBuilder.RenameColumn(
                name: "StockItemId",
                table: "Comment",
                newName: "OnItemId");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_StockItemId",
                table: "Comment",
                newName: "IX_Comment_OnItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_StockItems_OnItemId",
                table: "Comment",
                column: "OnItemId",
                principalTable: "StockItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
