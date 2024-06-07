using System;
using System.Collections.Generic;

namespace InsideAirBnbAPI.Model;

public partial class Listing
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    public int HostId { get; set; }

    public string? HostName { get; set; }

    public string? NeighbourhoodGroup { get; set; }

    public string Neighbourhood { get; set; } = null!;

    public string Latitude { get; set; } = null!;

    public string Longitude { get; set; } = null!;

    public string RoomType { get; set; } = null!;

    public decimal? Price { get; set; }

    public int MinimumNights { get; set; }

    public int NumberOfReviews { get; set; }

    public DateTime? LastReview { get; set; }

    public double? ReviewsPerMonth { get; set; }

    public int CalculatedHostListingsCount { get; set; }

    public int Availability365 { get; set; }

    public int NumberOfReviewsLtm { get; set; }

    public string? License { get; set; }
}
