using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InsideAirBnbAPI.Models;
using InsideAirBnbAPI.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Caching.Memory;
using InsideAirBnbAPI.Repository;

namespace InsideAirBnbAPI.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListingsController : ControllerBase
    {
        private readonly IListingRepository _listingRepository;
        private readonly IMemoryCache _cache;

        public ListingsController(IListingRepository listingRepository, IMemoryCache cache)
        {
            _listingRepository = listingRepository;
            _cache = cache;
        }

        // GET: api/Listings
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ListingCoordinateDTO>>> GetListings()
        {
            string cacheKey = "allListings";

            if (_cache.TryGetValue(cacheKey, out List<ListingCoordinateDTO> cachedListings))
            {
                return Ok(cachedListings);
            }

            var listings = await _listingRepository.GetListingCoordinatesAsync();

            var cacheOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromMinutes(5));

            _cache.Set(cacheKey, listings, cacheOptions);

            return Ok(listings);
        }

        // GET: api/Listings/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<ListingDetailDTO>> GetListing(string id)
        {
            var listing = await _listingRepository.GetByIdAsync(id);

            if (listing == null)
            {
                return NotFound();
            }

            var listingDetail = new ListingDetailDTO
            {
                Name = listing.Name,
                HostName = listing.HostName,
                Neighbourhood = listing.Neighbourhood,
                MinimumNights = listing.MinimumNights,
                NumberOfBookedNights = 365 - listing.Availability365,
                Price = listing.Price,
                NumberOfReviews = listing.NumberOfReviews
            };

            return Ok(listingDetail);
        }

        // GET: api/Listings/FilteredListing
        [HttpGet("FilteredListing")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ListingCoordinateDTO>>> GetFilteredListings(
            [FromQuery(Name = "neighbourhood")] string neighbourhood,
            [FromQuery(Name = "minPrice")] int givenMinPrice,
            [FromQuery(Name = "maxPrice")] int givenMaxPrice,
            [FromQuery(Name = "numOfReviews")] int numOfReviews
        )
        {
            int minPrice = givenMinPrice < givenMaxPrice ? givenMinPrice : givenMaxPrice;
            int maxPrice = givenMaxPrice > givenMinPrice ? givenMaxPrice : givenMinPrice;

            var listings = await _listingRepository.GetFilteredListingsAsync(neighbourhood, minPrice, maxPrice, numOfReviews);

            return Ok(listings);
        }

        // GET: api/Listings/stats
        [HttpGet("Stats")]
        [Authorize("read:statistics")]
        public async Task<ActionResult<StatsDTO>> GetStats()
        {
            var roomTypeStats = await _listingRepository.GetRoomTypeStatsAsync();
            var hostStats = await _listingRepository.GetHostStatsAsync();

            var stats = new StatsDTO
            {
                RoomTypeStats = roomTypeStats,
                HostStats = hostStats
            };

            return Ok(stats);
        }
    }
}
