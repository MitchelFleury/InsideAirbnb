using InsideAirBnbAPI.Models.DTOs;
using InsideAirBnbAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace InsideAirBnbAPI.Repository
{
    public class ListingRepository: IListingRepository
    {
        private readonly DatabaseContext _context;

        public ListingRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ListingCoordinateDTO>> GetListingCoordinatesAsync()
        {
            return await _context.Listings
                .AsNoTracking()
                .Select(listing => new ListingCoordinateDTO
                {
                    Id = listing.Id,
                    Latitude = Convert.ToDouble(listing.Latitude),
                    Longitude = Convert.ToDouble(listing.Longitude)
                }).ToListAsync();
        }

        public async Task<IEnumerable<ListingCoordinateDTO>> GetFilteredListingsAsync(string neighbourhood, int minPrice, int maxPrice, int numOfReviews)
        {
            var query = _context.Listings.AsQueryable();

            if (!string.Equals(neighbourhood, "paris", StringComparison.OrdinalIgnoreCase))
            {
                query = query.Where(listing => listing.Neighbourhood == neighbourhood);
            }

            query = query.Where(listing => listing.Price >= minPrice && listing.Price <= maxPrice && listing.NumberOfReviews >= numOfReviews);

            return await query
                .AsNoTracking()
                .Select(listing => new ListingCoordinateDTO
                {
                    Id = listing.Id,
                    Latitude = Convert.ToDouble(listing.Latitude),
                    Longitude = Convert.ToDouble(listing.Longitude)
                }).ToListAsync();
        }

        public async Task<IEnumerable<RoomTypeStatsDTO>> GetRoomTypeStatsAsync()
        {
            return await _context.Listings
                .AsNoTracking()
                .GroupBy(listing => listing.RoomType)
                .Select(group => new RoomTypeStatsDTO
                {
                    RoomType = group.Key,
                    Count = group.Count()
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<HostStatsDTO>> GetHostStatsAsync()
        {
            return await _context.Listings
                .AsNoTracking()
                .GroupBy(l => l.HostId)
                .Select(g => new
                {
                    HostId = g.Key,
                    ListingCount = g.Count()
                })
                .Select(h => new
                {
                    h.HostId,
                    h.ListingCount,
                    ListingRange = h.ListingCount <= 9 ? h.ListingCount : 10
                })
                .GroupBy(h => h.ListingRange)
                .OrderBy(g => g.Key)
                .Select(g => new HostStatsDTO
                {
                    ListingRange = g.Key == 10 ? "10+" : g.Key.ToString(),
                    Count = g.Count()
                })
                .ToListAsync();
        }

        public async Task<ListingDetailDTO> GetByIdAsync(string id)
        {
            var listing = await _context.Listings
                .AsNoTracking()
                .Where(listing => listing.Id == id)
                .Select(listing => new ListingDetailDTO
                {
                    Name = listing.Name,
                    HostName = listing.HostName,
                    Neighbourhood = listing.Neighbourhood,
                    MinimumNights = listing.MinimumNights,
                    NumberOfBookedNights = 365 - listing.Availability365,
                    Price = listing.Price,
                    NumberOfReviews = listing.NumberOfReviews
                })
                .FirstOrDefaultAsync();

            if (listing == null)
            {
                return null;
            }

            return listing;
        }
    }
}
