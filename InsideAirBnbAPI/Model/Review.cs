using System;
using System.Collections.Generic;

namespace InsideAirBnbAPI.Model;

public partial class Review
{
    public long ListingId { get; set; }

    public DateOnly Date { get; set; }
}
