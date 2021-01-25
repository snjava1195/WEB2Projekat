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
        [Route("AllRentaCarDetails")]
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
        [Route("GetRentaCarDetailsById/{rentaCarId}")]
        public IHttpActionResult GetRentaCarById(string rentaCarId)
        {
            RentaCar objUsr = new RentaCar();
            int ID = Convert.ToInt32(rentaCarId);

            try
            {
                objUsr = objEntity.RentaCars.Find(ID);
                if (objUsr == null)
                    return NotFound();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objUsr);
        }


        [HttpPost]
        [Route("InsertRentaCarDetails")]
        public IHttpActionResult PostRentaCar(RentaCar data)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                data.Rate = 0;
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
        [Route("UpdateRentaCarDetails")]
        public IHttpActionResult PutRentaCar(RentaCar rentaCar)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                RentaCar objUsr = new RentaCar();

                objUsr = objEntity.RentaCars.Find(rentaCar.Id);
                if (objUsr != null)
                {
                    objUsr.Id = rentaCar.Id;
                    objUsr.Name = rentaCar.Name;
                    objUsr.Address = rentaCar.Address;
                    objUsr.Description = rentaCar.Description;

                }
                int i = objEntity.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(rentaCar);
        }


        [HttpDelete]
        [Route("DeleteRentaCarDetails")]
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
