using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using PublicSpacePlanner.Data;

namespace PublicSpacePlanner.Migrations
{
    [DbContext(typeof(SpacePlannerDbContext))]
    [Migration("20170225164933_initial")]
    partial class initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752");

            modelBuilder.Entity("PublicSpacePlanner.Data.Models.Blueprint", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CreatorId");

                    b.Property<string>("Description");

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("CreatorId");

                    b.ToTable("Blueprints");
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

            modelBuilder.Entity("PublicSpacePlanner.Data.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ImageUrl");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PublicSpacePlanner.Data.Models.Blueprint", b =>
                {
                    b.HasOne("PublicSpacePlanner.Data.Models.User", "Creator")
                        .WithMany("BlueprintsCreated")
                        .HasForeignKey("CreatorId");
                });

            modelBuilder.Entity("PublicSpacePlanner.Data.Models.Rating", b =>
                {
                    b.HasOne("PublicSpacePlanner.Data.Models.User", "GivenBy")
                        .WithMany("Ratings")
                        .HasForeignKey("GivenById");

                    b.HasOne("PublicSpacePlanner.Data.Models.Blueprint", "Target")
                        .WithMany("Ratings")
                        .HasForeignKey("TargetId");
                });
        }
    }
}
