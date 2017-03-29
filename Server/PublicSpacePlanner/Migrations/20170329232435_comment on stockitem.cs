using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PublicSpacePlanner.Migrations
{
    public partial class commentonstockitem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Blueprints_StockItemId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Blueprints_TargetId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Blueprints_Users_CreatorId",
                table: "Blueprints");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Blueprints",
                table: "Blueprints");

            migrationBuilder.RenameTable(
                name: "Blueprints",
                newName: "StockItems");

            migrationBuilder.RenameIndex(
                name: "IX_Blueprints_CreatorId",
                table: "StockItems",
                newName: "IX_StockItems_CreatorId");

            migrationBuilder.RenameColumn(
                name: "StockItemId",
                table: "Comment",
                newName: "OnItemId");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_StockItemId",
                table: "Comment",
                newName: "IX_Comment_OnItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_StockItems",
                table: "StockItems",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_StockItems_OnItemId",
                table: "Comment",
                column: "OnItemId",
                principalTable: "StockItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_StockItems_TargetId",
                table: "Ratings",
                column: "TargetId",
                principalTable: "StockItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_StockItems_Users_CreatorId",
                table: "StockItems",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_StockItems_OnItemId",
                table: "Comment");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_StockItems_TargetId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_StockItems_Users_CreatorId",
                table: "StockItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_StockItems",
                table: "StockItems");

            migrationBuilder.RenameTable(
                name: "StockItems",
                newName: "Blueprints");

            migrationBuilder.RenameIndex(
                name: "IX_StockItems_CreatorId",
                table: "Blueprints",
                newName: "IX_Blueprints_CreatorId");

            migrationBuilder.RenameColumn(
                name: "OnItemId",
                table: "Comment",
                newName: "StockItemId");

            migrationBuilder.RenameIndex(
                name: "IX_Comment_OnItemId",
                table: "Comment",
                newName: "IX_Comment_StockItemId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Blueprints",
                table: "Blueprints",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Blueprints_StockItemId",
                table: "Comment",
                column: "StockItemId",
                principalTable: "Blueprints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Blueprints_TargetId",
                table: "Ratings",
                column: "TargetId",
                principalTable: "Blueprints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Blueprints_Users_CreatorId",
                table: "Blueprints",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
