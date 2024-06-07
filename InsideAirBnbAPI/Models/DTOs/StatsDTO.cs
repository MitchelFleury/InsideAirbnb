using Microsoft.AspNetCore.Mvc;

namespace InsideAirBnbAPI.Models.DTOs
{
    public class StatsDTO
    {
        public IEnumerable<RoomTypeStatsDTO> RoomTypeStats { get; set; }
        public IEnumerable<HostStatsDTO> HostStats { get; set; }
    }
}
