using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using UserAPI.Models;

namespace UserAPI.Controllers
{
    [RoutePrefix("Api/BranchOffice")]
    public class BranchOfficeController : ApiController
    {

        AngularEntities2 objEntity = new AngularEntities2();

        [HttpGet]
        [Route("AllBranchOffices")]
        public IQueryable<BranchOffice> GetBranchOffeces()
        {
            try
            {
                return objEntity.BranchOffices;
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet]
        [Route("GetBranchOfficeById/{branchOfficeId}")]
        public IHttpActionResult GeBranchOfficeById(string branchOfficeId)
        {
            BranchOffice office = new BranchOffice();
            int ID = Convert.ToInt32(branchOfficeId);

            try
            {
                office = objEntity.BranchOffices.Find(ID);
                if (office == null)
                    return NotFound();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(office);
        }



        [HttpPost]
        [Route("InsertBranchOffice")]
        public IHttpActionResult PostBranchOffice(BranchOffice data)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                objEntity.BranchOffices.Add(data);
                objEntity.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(data);
        }


        [HttpPut]
        [Route("UpdateBranchOffice")]
        public IHttpActionResult PutCar(BranchOffice data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                BranchOffice office = new BranchOffice();
                office = objEntity.BranchOffices.Find(data.Id);

                if (office != null)
                {
                    office.Id = data.Id;
                    office.Name = data.Name;
                    office.Address = data.Address;
                    office.RentaCarId = data.RentaCarId;

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
        [Route("DeleteBranchOffice")]
        public IHttpActionResult DeleteBranchOffice(int id)
        {
            BranchOffice office = objEntity.BranchOffices.Find(id);
            if (office == null)
            {
                return NotFound();
            }

            objEntity.BranchOffices.Remove(office);
            objEntity.SaveChanges();

            return Ok(office);
        }

    }
}
