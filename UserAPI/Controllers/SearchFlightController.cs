using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UserAPI.Models;

namespace UserAPI.Controllers
{
    [RoutePrefix("Api/SearchFlight")]
    public class SearchFlightController : ApiController
    {
        AngularEntities3 objEntity = new AngularEntities3();
        public List<Flight> check;
        [HttpGet]
        [Route("SearchFlightDetails")]
        public IHttpActionResult GetUser(string datumPoletanja, string datumSletanja, string mestoPoletanja, string mestoSletanja, string klasa, string pravac, int brojPutnika)
        {

           //var check = new List<Flight>();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {

                DateTime dt = DateTime.ParseExact(datumPoletanja, "M/dd/yy, h:mm tt", CultureInfo.InvariantCulture);
                DateTime dt2 = DateTime.ParseExact(datumSletanja, "M/dd/yy, h:mm tt", CultureInfo.InvariantCulture);


                try
                {
                    using (var context = new AngularEntities3())
                    {
                        var flights = from f in context.Flights
                                      where f.DatumPoletanja == dt && f.DatumSletanja == dt2 && f.BrojSedista - brojPutnika != 0 && f.MestoPoletanja == mestoPoletanja && f.MestoSletanja == mestoSletanja
                                      select f;


                        check = flights.ToList();
                        if (check == null)
                            return NotFound();

                    }
                }
                catch (Exception ex)
                {
                    throw;
                }

            }
            catch (Exception)
            {

            }
            return Ok(check);
        }

        [Route("GetSearchResults")]
        [HttpGet]
        public IHttpActionResult GetFlight()
        {
            return Ok(check);
        }

        [Route("ReserveFlight")]
        [HttpPost]
        public IHttpActionResult ReserveFlight(int flightId, string userId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {


                userId.GetType();

                var reservation = new FlightReservation()
                {
                    FlightId = flightId,
                    UserId = Int16.Parse(userId)

                    };

                objEntity.FlightReservations.Add(reservation);
                objEntity.SaveChanges();
               

            }
            catch (Exception)
            {

            }
            return Ok(check);
        }

        [Route("GetReservations")]
        [HttpGet]
        public IHttpActionResult GetReservations(string userId)
        {
            var flightsRes=new List<Flight>();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var id = Int16.Parse(userId);
                var reservations = new List<FlightReservation>();
                using (var context = new AngularEntities3())
                {
                    var flights = from f in context.FlightReservations
                                  where f.UserId == id
                                  select f;

                    reservations = flights.ToList();
                }
              
                foreach(FlightReservation f in reservations)
                {
                    flightsRes.Add(objEntity.Flights.Find(f.FlightId));
                }

                


            }
            catch (Exception ex)
            {

            }
            return Ok(flightsRes);
        }

        [HttpDelete]
        [Route("CancelReservation")]
        public IHttpActionResult CancelReservation(string userId, int flightId)
        {
          
            FlightReservation reservation = new FlightReservation();
            var id = Int16.Parse(userId);
            using (var context = new AngularEntities3())
            {
                var flights = from f in context.FlightReservations
                              where  f.UserId == id && f.FlightId ==flightId
                              select f;

                reservation = flights.First();
            }
            if (!objEntity.FlightReservations.Local.Contains(reservation))
            {
                objEntity.FlightReservations.Attach(reservation);
            }
                objEntity.FlightReservations.Remove(reservation);
            objEntity.SaveChanges();

            return Ok(reservation);
        }
    }
}
