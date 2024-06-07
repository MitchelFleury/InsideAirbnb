using InsideAirBnbAPI.Models;
using InsideAirBnbAPI.Models.DTOs;

namespace InsideAirBnbAPI.Repository
{
    public interface IListingRepository: IRepository<Listing>
    {
        Task<IEnumerable<ListingCoordinateDTO>> GetListingCoordinatesAsync();
        Task<ListingDetailDTO> GetByIdAsync(string id);
        Task<IEnumerable<ListingCoordinateDTO>> GetFilteredListingsAsync(string neighbourhood, int minPrice, int maxPrice, int numOfReviews);
        Task<IEnumerable<RoomTypeStatsDTO>> GetRoomTypeStatsAsync();
        Task<IEnumerable<HostStatsDTO>> GetHostStatsAsync();
    }
}
