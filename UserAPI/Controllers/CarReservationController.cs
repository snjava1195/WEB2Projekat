using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using UserAPI.Models;

namespace UserAPI.Controllers
{
    [RoutePrefix("Api/CarReservation")]
    public class CarReservationController : ApiController
    {

        //AngularEntities2 objEntity = new AngularEntities2();


        //[HttpGet]
        //[Route("AllCarReservations")]
        //public IQueryable<CarReservation> GetCarReservations()
        //{
        //    try
        //    {
        //        return objEntity.CarReservations;
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        //[HttpGet]
        //[Route("GetCarReservationById/{carReservationId}")]
        //public IHttpActionResult GetCarReservationById(string carReservationId)
        //{
        //    CarReservation cr = new CarReservation();
        //    int ID = Convert.ToInt32(carReservationId);

        //    try
        //    {
        //        cr = objEntity.CarReservations.Find(ID);

        //        if (cr == null)
        //            return NotFound();
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }

        //    return Ok(cr);
        //}


        //[HttpGet]
        //[Route("GetUsersCarReservations")]
        //public IQueryable<CarReservation> GetUsersCarReservations(int userId)
        //{
        //    try
        //    {
        //        return objEntity.CarReservations.Where(cr => cr.UserId == userId);
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        //[HttpGet]
        //[Route("IsCarReserved")]
        //public bool IsCarReserved(int carId, string dateFrom, string dateTo)
        //{
        //    DateTime from = JsonConvert.DeserializeObject<DateTime>(dateFrom).AddDays(1);
        //    DateTime to = JsonConvert.DeserializeObject<DateTime>(dateTo).AddDays(1);

        //    try
        //    {
        //        IQueryable<CarReservation> ReservedCars = objEntity.CarReservations.Where(cr => cr.CarId == carId);

        //        if (ReservedCars.Count() > 0 )
        //        {
        //            ReservedCars = ReservedCars.Where(rc =>  to >= rc.DateFrom);
        //            ReservedCars = ReservedCars.Where(rc =>  from <= rc.DateTo);

        //            if (ReservedCars.Count() > 0)
        //                   return true;
        //            else
        //                return false;
        //        }
        //        else
        //            return false;
   
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        //[HttpGet]
        //[Route("CarReservationPast/{crId}")]
        //public bool CarReservationPast(string crId)
        //{
        //    int ID = Convert.ToInt32(crId);

        //    try
        //    {
        //       CarReservation cr = objEntity.CarReservations.Find(ID);

        //            if (cr.DateTo.AddDays(1) < DateTime.Today)
        //                return false;
        //            else
        //                return true;
            
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        //[HttpGet]
        //[Route("MinTwoDaysLeft/{crId}")]
        //public bool MinTwoDaysLeft(string crId)
        //{
        //    int ID = Convert.ToInt32(crId);

        //    try
        //    {
        //        CarReservation cr = objEntity.CarReservations.Find(ID);

        //        if (cr.DateFrom.AddDays(1) < DateTime.Today.AddDays(3))
        //            return false;
        //        else
        //            return true;

        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}


        //[HttpPost]
        //[Route("InsertCarReservation")]
        //public IHttpActionResult PostCarReservation(CarReservation data)
        //{
        //    if (!ModelState.IsValid) 
        //        return BadRequest(ModelState);
        //    try
        //    {
        //        objEntity.CarReservations.Add(data);
        //        objEntity.SaveChanges();
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }

        //    return Ok(data);
        //}




        //[HttpPut]
        //[Route("UpdateCarReservation")]
        //public IHttpActionResult PutCarReservation(CarReservation data)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    try
        //    {
        //        CarReservation cr = new CarReservation();
        //        cr = objEntity.CarReservations.Find(data.Id);
  

        //        if (cr != null)
        //        {
        //            cr.Id = data.Id;
        //            cr.CarId = data.CarId;
        //            cr.UserId = data.UserId;
        //            cr.DateFrom = data.DateFrom;
        //            cr.DateTo = data.DateTo;
        //            cr.CarName = data.CarName;
        //            cr.Price = data.Price;
        //        }
        //        objEntity.SaveChanges();
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //    return Ok(data);
        //}





        //[HttpDelete]
        //[Route("DeleteCarReservation")]
        //public IHttpActionResult DeleteCarReservation(int rcId)
        //{
        //    CarReservation cr = objEntity.CarReservations.Find(rcId);

        //    if (cr == null)
        //    {
        //        return NotFound();
        //    }

        //    objEntity.CarReservations.Remove(cr);
        //    objEntity.SaveChanges();

        //    return Ok(cr);
        //}




    }
}
