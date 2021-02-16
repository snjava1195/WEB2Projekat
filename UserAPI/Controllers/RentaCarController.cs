using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using UserAPI.Models;

namespace UserAPI.Controllers
{
    [RoutePrefix("Api/RentaCar")]
    public class RentaCarController : ApiController
    {

        AngularEntities2 objEntity = new AngularEntities2();


        [HttpGet]
        [Route("AllRentaCars")]
        public IQueryable<RentaCar> GetRentaCars()
        {
            try
            {                   
                return objEntity.RentaCars;
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet]
        [Route("GetRentaCarById")]
        public IHttpActionResult GetRentaCarById(int rentaCarId)
        {
            RentaCar rentaCar= new RentaCar();

            try
            {
                rentaCar = objEntity.RentaCars.Find(rentaCarId);

                if (rentaCar == null)
                  return NotFound();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(rentaCar);
        }



        [HttpGet]
        [Route("GetRentaCarByName/{rentaCarName}")]
        public IQueryable<RentaCar> GetRentaCarByName(string rentaCarName)
        {
            RentaCar rentaCar = new RentaCar();
            string ifSmall = rentaCarName.First().ToString().ToUpper() +
                String.Join("", rentaCarName.Skip(1));

            try
            {
                return objEntity.RentaCars.Where(c => c.Name.Contains(rentaCarName) && c.Name.Contains(ifSmall));
            }
            catch (Exception)
            {
                throw;
            }

        }





        [HttpGet]
        [Route("GetRentaCarByLocation/{rentaCarLocation}")]
        public IQueryable<RentaCar> GetRentaCarByLocation(string rentaCarLocation)
        {
            RentaCar rentaCar = new RentaCar();
            string ifSmall = rentaCarLocation.First().ToString().ToUpper() +
                String.Join("", rentaCarLocation.Skip(1));

            try
            {
                return objEntity.RentaCars.Where(c => c.City.Contains(rentaCarLocation) && c.City.Contains(ifSmall));
            }
            catch (Exception)
            {
                throw;
            }

        }


        [HttpGet]
        [Route("SortRentaCarsByName")]
        public IQueryable<RentaCar> SortRentaCarsByName()
        {
            try
            {
                return objEntity.RentaCars.OrderBy(o => o.Name);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet]
        [Route("SortRentaCarsByCity")]
        public IQueryable<RentaCar> SortRentaCarsByCity()
        {
            try
            {
                return objEntity.RentaCars.OrderBy(o => o.City);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("InsertRentaCar")]
        public IHttpActionResult PostRentaCar(RentaCar data)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                data.Rate = 0;
                data.RatedBy = 0;
                objEntity.RentaCars.Add(data);
                objEntity.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(data);
        }


        [HttpPut]
        [Route("UpdateRentaCar")]
        public IHttpActionResult PutRentaCar(RentaCar data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                RentaCar rentaCar = new RentaCar();
                rentaCar = objEntity.RentaCars.Find(data.Id);

                if (rentaCar != null)
                {
                    rentaCar.Id = data.Id;
                    rentaCar.Name = data.Name;
                    rentaCar.Address = data.Address;
                    rentaCar.City = data.City;
                    rentaCar.Description = data.Description;
                    rentaCar.Rate = data.Rate;
                    rentaCar.RatedBy = data.RatedBy;
                }
                int i = objEntity.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(data);
        }


        [HttpDelete]
        [Route("DeleteRentaCar")]
        public IHttpActionResult DeleteRentaCar(int id)
        {
            RentaCar rentaCar = objEntity.RentaCars.Find(id);
            if (rentaCar == null)
            {
                return NotFound();
            }

            objEntity.RentaCars.Remove(rentaCar);
            objEntity.SaveChanges();

            return Ok(rentaCar);
        }



    }
}
