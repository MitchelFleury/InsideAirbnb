using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace InsideAirBnbAPI.Models;

public partial class Listing
{
    public string Id { get; set; } = null!;

    public string Name { get; set; } = null!;

    [Column("host_id")]
    public int HostId { get; set; }

    [Column("host_name")]
    public string? HostName { get; set; }

    [Column("neighbourhood_group")]
    public string? NeighbourhoodGroup { get; set; }

    public string Neighbourhood { get; set; } = null!;

    public string Latitude { get; set; } = null!;

    public string Longitude { get; set; } = null!;

    [Column("room_type")]
    public string RoomType { get; set; } = null!;

    public decimal? Price { get; set; }

    [Column("minimum_nights")]
    public int MinimumNights { get; set; }

    [Column("number_of_reviews")]
    public int NumberOfReviews { get; set; }

    [Column("last_review")]
    public DateTime? LastReview { get; set; }

    [Column("reviews_per_month")]
    public double? ReviewsPerMonth { get; set; }

    [Column("calculated_host_listings_count")]
    public int CalculatedHostListingsCount { get; set; }

    [Column("availability_365")]
    public int Availability365 { get; set; }

    [Column("number_of_reviews_ltm")]
    public int NumberOfReviewsLtm { get; set; }

    public string? License { get; set; }
}
