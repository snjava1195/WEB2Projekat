using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UserAPI.Models;

namespace UserAPI.Controllers
{
    [RoutePrefix("Api/Flight")]
    public class FlightController : ApiController
    {
        AngularEntities2 objEntity = new AngularEntities2();
        [HttpGet]
        [Route("AllFlightDetails")]
        public IQueryable<Flight> GetAirline()
        {
            try
            {
                return objEntity.Flights;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("AllFlightDetailsById/{airlineId}")]
        public IHttpActionResult GetFlightsById(int airlineId)
        {
            var check = new List<Flight>();
            try
            {
                using (var context = new AngularEntities2())
                {
                    var flights = from f in context.Flights
                                  where f.IdAvioKompanije == airlineId
                                  select f;
                     check = flights.ToList();
                    if (check == null)
                        return NotFound();
                   
                }
            }
            catch (Exception)
            {
                throw;
            }
            return Ok(check);
        }

        [HttpPost]
        [Route("InsertFlightDetails")]
        public IHttpActionResult PostUser(FlightConverter data)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {

                DateTime dt = DateTime.ParseExact(data.DatumPoletanja, "M/dd/yy, h:mm tt", CultureInfo.InvariantCulture);
                DateTime dt2 = DateTime.ParseExact(data.DatumSletanja, "M/dd/yy, h:mm tt", CultureInfo.InvariantCulture);
                string input = data.DatumPoletanja;
                DateTime originalDate = DateTime.Parse(input);
               
                var flights = new Flight()
                {
                    BrojPresedanja = data.BrojPresedanja,
                    CenaBiznisKlase = data.CenaBiznisKlase,
                    CenaEkonomskeKlase = data.CenaEkonomskeKlase,
                    CenaPrveKlase = data.CenaPrveKlase,
                    DatumPoletanja = dt,
                    DatumSletanja = dt2,
                    DuzinaPutovanja = data.DuzinaPutovanja,
                    Id = data.Id,
                    IdAvioKompanije = data.IdAvioKompanije,
                    MestoPoletanja = data.MestoPoletanja,
                    MestoSletanja = data.MestoSletanja,
                    OcenaLeta = data.OcenaLeta,
                    VremeTrajanjaLeta = data.VremeTrajanjaLeta,
                    BrojSedista = data.BrojSedista

                };
                //try { 
                objEntity.Flights.Add(flights);
                objEntity.SaveChanges();

            }
            catch (Exception ex)
            {
                throw;
            }

            return Ok(data);
        }

        [HttpGet]
        [Route("AirlineList")]
        public IQueryable<AirlineDetail> AirlineIds()
        {
            try
            {
                return objEntity.AirlineDetails;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
