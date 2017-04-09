using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using PublicSpacePlanner.Data;

namespace PublicSpacePlanner.Migrations
{
    [DbContext(typeof(SpacePlannerDbContext))]
    [Migration("20170409165641_event-type")]
    partial class eventtype
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752");

            modelBuilder.Entity("PublicSpacePlanner.Data.Models.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CreatedById");

                    b.Property<string>("Message");

                    b.Property<int?>("StockItemId");

                    b.Property<DateTime>("Time");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("StockItemId");

                    b.ToTable("Comment");
                });

            modelBuilder.Entity("PublicSpacePlanner.Data.Models.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<int>("EntityId");

                    b.Property<string>("EntityType");

                    b.Property<string>("EventType");

                    b.HasKey("Id");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("PublicSpacePlanner.Data.Models.Rating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("GivenById");

                    b.Property<int?>("TargetId");

                    b.Property<int>("Value");

                    b.HasKey("Id");

                    b.HasIndex("GivenById");

                    b.HasIndex("TargetId");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("PublicSpacePlanner.Data.Models.StockItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CreatorId");

                    b.Property<string>("Description");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("CreatorId");

                    b.ToTable("StockItems");
                });

            modelBuilder.Entity("PublicSpacePlanner.Data.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("Active");

                    b.Property<string>("Email");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Name");

                    b.Property<string>("Password");

                    b.Property<string>("Role");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PublicSpacePlanner.Data.Models.Comment", b =>
                {
                    b.HasOne("PublicSpacePlanner.Data.Models.User", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.HasOne("PublicSpacePlanner.Data.Models.StockItem", "StockItem")
                        .WithMany("Comments")
                        .HasForeignKey("StockItemId");
                });

            modelBuilder.Entity("PublicSpacePlanner.Data.Models.Rating", b =>
                {
                    b.HasOne("PublicSpacePlanner.Data.Models.User", "GivenBy")
                        .WithMany("Ratings")
                        .HasForeignKey("GivenById");

                    b.HasOne("PublicSpacePlanner.Data.Models.StockItem", "Target")
                        .WithMany("Ratings")
                        .HasForeignKey("TargetId");
                });

            modelBuilder.Entity("PublicSpacePlanner.Data.Models.StockItem", b =>
                {
                    b.HasOne("PublicSpacePlanner.Data.Models.User", "Creator")
                        .WithMany("StockItemsCreated")
                        .HasForeignKey("CreatorId");
                });
        }
    }
}
