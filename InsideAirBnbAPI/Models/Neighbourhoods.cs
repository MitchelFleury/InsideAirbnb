using System.ComponentModel.DataAnnotations.Schema;

namespace InsideAirBnbAPI.Models
{
    [Table("neighbourhoods")]
    public class Neighbourhoods
    {
        public string Neighbourhood { get; set; }
    }
}
