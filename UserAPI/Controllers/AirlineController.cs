using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UserAPI.Models;

namespace UserAPI.Controllers
{
    [RoutePrefix("Api/Airline")]
    public class AirlineController : ApiController
    {
        AngularEntities2 objEntity = new AngularEntities2();
        [HttpGet]
        [Route("AllAirlinesDetails")]
        public IQueryable<Airline> GetAirline()
        {
            try
            {
                return objEntity.Airlines;
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpGet]
        [Route("GetAirlineDetailsById/{airlineId}")]
        public IHttpActionResult GetAirlineById(string airlineId)
        {
            Airline objUsr = new Airline();
            int ID = Convert.ToInt32(airlineId);
            try
            {
                objUsr = objEntity.Airlines.Find(ID);
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
        [Route("InsertAirlineDetails")]
        public IHttpActionResult PostUser(Airline data)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                
                        
                        objEntity.Airlines.Add(data);
                        objEntity.SaveChanges();
                    
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(data);
        }

        [HttpPut]
        [Route("UpdateAirlineDetails")]
        public IHttpActionResult PutUserMaster(Airline airline)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Airline objUsr = new Airline();
                objUsr = objEntity.Airlines.Find(airline.Id);
                if (objUsr != null)
                {
                    objUsr.Id = airline.Id;
                    objUsr.Name = airline.Name;
                    objUsr.Address = airline.Address;
                    objUsr.Description = airline.Description;
                  


                }
                int i = objEntity.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(airline);
        }
        [HttpDelete]
        [Route("DeleteUserDetails")]
        public IHttpActionResult DeleteUserDelete(int id)
        {
            //int empId = Convert.ToInt32(id);  
            Airline airline = objEntity.Airlines.Find(id);
            if (airline == null)
            {
                return NotFound();
            }

            objEntity.Airlines.Remove(airline);
            objEntity.SaveChanges();

            return Ok(airline);
        }
    }
}
