using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UserAPI.Models;
using UserAPI.Models.Enums;
using static UserAPI.Models.Login;

namespace UserAPI.Controllers
{
    [RoutePrefix("Api/User")]
    public class UserAPIController : ApiController
    {
        AngularEntities2 objEntity = new AngularEntities2();
       
        [Route("UserLogin")]
        [HttpPost]
        public IHttpActionResult Login(Login lg)
        {
            AngularEntities2 DB = new AngularEntities2();
            var Obj = DB.Usp_Login(lg.Email, lg.Password).ToList<Usp_Login_Result>().FirstOrDefault();


            if (Obj == null)
                return NotFound();
            else
                return Ok(Obj.UserType);
                       
       
        }




        [HttpGet]
        [Route("AllUserDetails")]
        public IQueryable<UserDetail> GetUser()
        {
            try
            {
                return objEntity.UserDetails;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetUserDetailsById/{userId}")]
        public IHttpActionResult GetUserById(string userId)
        {
            UserDetail objUsr = new UserDetail();
            int ID = Convert.ToInt32(userId);
            try
            {
                objUsr = objEntity.UserDetails.Find(ID);
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
        [Route("InsertUserDetails")]
        public IHttpActionResult PostUser(UserDetail data)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                if (data.Password == data.ConfirmPassword)
                {
                    if (data.Email == "snjava@gmail.com" && data.Password == "1234")
                    {
                        data.UserType = Convert.ToInt32(UserType.SystemAdmin);
                        objEntity.UserDetails.Add(data);
                        objEntity.SaveChanges();
                    }
                    else
                    {
                        data.UserType = Convert.ToInt32(UserType.User);
                        objEntity.UserDetails.Add(data);
                        objEntity.SaveChanges();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(data);
        }

        [HttpPut]
        [Route("UpdateUserDetails")]
        public IHttpActionResult PutUserMaster(UserDetail user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                UserDetail objUsr = new UserDetail();
                objUsr = objEntity.UserDetails.Find(user.UserId);
                if (objUsr != null)
                {
                    objUsr.UserId = user.UserId;
                    objUsr.Name = user.Name;
                    objUsr.LastName = user.LastName;
                    objUsr.Password = user.Password;
                    objUsr.ConfirmPassword = user.ConfirmPassword;
                    objUsr.Phone = user.Phone;
                    objUsr.City = user.City;
                    objUsr.Email = user.Email;

                }
                int i = objEntity.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(user);
        }
        [HttpDelete]
        [Route("DeleteUserDetails")]
        public IHttpActionResult DeleteUserDelete(int id)
        {
            //int empId = Convert.ToInt32(id);  
            UserDetail user = objEntity.UserDetails.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            objEntity.UserDetails.Remove(user);
            objEntity.SaveChanges();

            return Ok(user);
        }

        [HttpPost]
        [Route("SetAsAdmin")]
        public IHttpActionResult SetUserAdmin(bool checkbox, string email)
        {
            if (checkbox == true)
            {
                UserDetail user = objEntity.UserDetails.Find(email);
                user.UserType = Convert.ToInt32(UserType.CarAdmin);
                return Ok(checkbox);
            }
            else
                return NotFound();
        }
    }
}
