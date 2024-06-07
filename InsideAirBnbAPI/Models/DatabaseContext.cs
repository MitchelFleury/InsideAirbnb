using Microsoft.EntityFrameworkCore;
using InsideAirBnbAPI.Models;
using InsideAirBnbAPI.Models.DTOs;

namespace InsideAirBnbAPI.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<Listing> Listings { get; set; }
        public DbSet<Neighbourhoods> Neighbourhoods { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Listing>()
                .ToTable("listings");

            modelBuilder.Entity<Neighbourhoods>()
                .HasNoKey();

            base.OnModelCreating(modelBuilder);
        }
    }
}
