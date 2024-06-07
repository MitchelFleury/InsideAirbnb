using InsideAirBnbAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace InsideAirBnbAPI.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class NeighbourhoodsController
    {
        private readonly DatabaseContext _context;

        public NeighbourhoodsController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Neighbourhoods
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Neighbourhoods>>> GetNeighburhoods()
        {
            return await _context.Neighbourhoods
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
