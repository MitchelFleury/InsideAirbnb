namespace InsideAirBnbAPI.Models.DTOs
{
    public class ListingDetailDTO
    {
        public string Name { get; set; }
        public string? HostName { get; set; }
        public string Neighbourhood { get; set; }
        public int MinimumNights { get; set; }
        public int NumberOfBookedNights { get; set; }
        public int Availability365 { get; set; }
        public decimal? Price { get; set; }
        public int NumberOfReviews { get; set; }
    }
}
