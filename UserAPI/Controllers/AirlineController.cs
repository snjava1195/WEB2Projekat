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
        [Route("AllAirlineDetails")]
        public IQueryable<AirlineDetail> GetAirline()
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
        [HttpGet]
        [Route("GetAirlineDetailsById/{airlineId}")]
        public IHttpActionResult GetAirlineById(string airlineId)
        {
            AirlineDetail objUsr = new AirlineDetail();
            int ID = Convert.ToInt32(airlineId);
            try
            {
                objUsr = objEntity.AirlineDetails.Find(ID);
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
        public IHttpActionResult PostUser(AirlineDetail data)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                
                
                objEntity.AirlineDetails.Add(data);
                objEntity.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(data);
        }

        [HttpGet]
        [Route("AdminList")]
        public List<UserDetail> ListOfAdmins()
        {
            return objEntity.UserDetails.Where(s => s.UserType == 3).ToList<UserDetail>();
        }

        [HttpPut]
        [Route("UpdateAirlineDetails")]
        public IHttpActionResult PutUserMaster(AirlineDetail airline)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                AirlineDetail objUsr = new AirlineDetail();
                objUsr = objEntity.AirlineDetails.Find(airline.Id);
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
            AirlineDetail airline = objEntity.AirlineDetails.Find(id);
            if (airline == null)
            {
                return NotFound();
            }

            objEntity.AirlineDetails.Remove(airline);
            objEntity.SaveChanges();

            return Ok(airline);
        }

        [HttpPost]
        [Route("AddAsAirlineAdmin")]
        public IHttpActionResult AddAirlineAdmin( int airlineId, string adminName)
        {
            AirlineDetail airline = objEntity.AirlineDetails.Find(airlineId);
            UserDetail user = objEntity.UserDetails.Find(adminName);
            airline.AdminId = user.UserId;
            objEntity.SaveChanges();
            return Ok(airline);
        }
    }

    public class DTO
    {
        public AirlineDetail ad { get; set; }
        public string adminId { get; set; }
    }
}
