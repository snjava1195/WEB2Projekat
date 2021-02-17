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
        AngularEntities2 objEntity = new AngularEntities2();
        public List<Flight> check;
        public List<Prikaz> result = new List<Prikaz>();
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
                Prikaz nova=new Prikaz();

                try
                {
                    using (var context = new AngularEntities2())
                    {
                        var flights = from f in context.Flights
                                      where f.DatumPoletanja == dt && f.DatumSletanja == dt2 && f.BrojSedista - brojPutnika != 0 && f.MestoPoletanja == mestoPoletanja && f.MestoSletanja == mestoSletanja
                                      select f;


                        check = flights.ToList();
                        foreach(var f in check)
                        {
                            if(klasa=="Prva klasa")
                            {
                                nova = new Prikaz()
                                {
                                    BrojPresedanja = f.BrojPresedanja,
                                    BrojSedista = f.BrojSedista,
                                    Cena = f.CenaPrveKlase,
                                    DatumPoletanja = f.DatumPoletanja,
                                    DatumSletanja = f.DatumSletanja,
                                    DuzinaPutovanja = f.DuzinaPutovanja,
                                    Id = f.Id,
                                    IdAvioKompanije = f.IdAvioKompanije,
                                    MestoPoletanja = f.MestoPoletanja,
                                    MestoSletanja = f.MestoSletanja,
                                    OcenaLeta = f.OcenaLeta,
                                    VremeTrajanjaLeta = f.VremeTrajanjaLeta
                                };
                            }
                            if (klasa == "Ekonomska klasa")
                            {
                                nova = new Prikaz()
                                {
                                    BrojPresedanja = f.BrojPresedanja,
                                    BrojSedista = f.BrojSedista,
                                    Cena = f.CenaEkonomskeKlase,
                                    DatumPoletanja = f.DatumPoletanja,
                                    DatumSletanja = f.DatumSletanja,
                                    DuzinaPutovanja = f.DuzinaPutovanja,
                                    Id = f.Id,
                                    IdAvioKompanije = f.IdAvioKompanije,
                                    MestoPoletanja = f.MestoPoletanja,
                                    MestoSletanja = f.MestoSletanja,
                                    OcenaLeta = f.OcenaLeta,
                                    VremeTrajanjaLeta = f.VremeTrajanjaLeta
                                };
                            }

                            if (klasa == "Biznis klasa")
                            {
                               nova = new Prikaz()
                                {
                                    BrojPresedanja = f.BrojPresedanja,
                                    BrojSedista = f.BrojSedista,
                                    Cena = f.CenaBiznisKlase,
                                    DatumPoletanja = f.DatumPoletanja,
                                    DatumSletanja = f.DatumSletanja,
                                    DuzinaPutovanja = f.DuzinaPutovanja,
                                    Id = f.Id,
                                    IdAvioKompanije = f.IdAvioKompanije,
                                    MestoPoletanja = f.MestoPoletanja,
                                    MestoSletanja = f.MestoSletanja,
                                    OcenaLeta = f.OcenaLeta,
                                    VremeTrajanjaLeta = f.VremeTrajanjaLeta
                                };
                            }
                            result.Add(nova);
                        }
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
            return Ok(result);
        }

        [Route("GetSearchResults")]
        [HttpGet]
        public IHttpActionResult GetFlight()
        {
            return Ok(check);
        }

        [Route("ReserveFlight")]
        [HttpPost]
        public IHttpActionResult ReserveFlight(int flightId, string userId, long price)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {


                userId.GetType();

                var reservation = new FlightReservation1()
                {
                    FlightId = flightId,
                    UserId = Int16.Parse(userId),
                    Price = price

                    };

                objEntity.FlightReservation1.Add(reservation);
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
            var flightsRes=new List<Prikaz>();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var id = Int16.Parse(userId);
                var reservations = new List<FlightReservation1>();
                using (var context = new AngularEntities2())
                {
                    var flights = from f in context.FlightReservation1
                                  where f.UserId == id
                                  select f;

                    reservations = flights.ToList();
                }
              
                foreach(FlightReservation1 f in reservations)
                {
                    var convert = objEntity.Flights.Find(f.FlightId);
                    flightsRes.Add(new Prikaz()
                    {
                        BrojPresedanja = convert.BrojPresedanja,
                        BrojSedista = convert.BrojSedista,
                        Cena = f.Price,
                        DatumPoletanja = convert.DatumPoletanja,
                        DatumSletanja = convert.DatumSletanja,
                        DuzinaPutovanja = convert.DuzinaPutovanja,
                        Id = convert.Id,
                        IdAvioKompanije = convert.IdAvioKompanije,
                        MestoPoletanja = convert.MestoPoletanja,
                        MestoSletanja = convert.MestoSletanja,
                        OcenaLeta = convert.OcenaLeta,
                        VremeTrajanjaLeta = convert.VremeTrajanjaLeta
                    });
                   
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
          
            FlightReservation1 reservation = new FlightReservation1();
            var id = Int16.Parse(userId);
            using (var context = new AngularEntities2())
            {
                var flights = from f in context.FlightReservation1
                              where  f.UserId == id && f.FlightId ==flightId
                              select f;

                reservation = flights.First();
            }
            if (!objEntity.FlightReservation1.Local.Contains(reservation))
            {
                objEntity.FlightReservation1.Attach(reservation);
            }
                objEntity.FlightReservation1.Remove(reservation);
            objEntity.SaveChanges();

            return Ok(reservation);
        }
    }
}
