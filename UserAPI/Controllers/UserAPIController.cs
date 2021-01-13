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
        UserContext ctx = new UserContext();
        [Route("UserLogin")]
        [HttpPost]
        public IHttpActionResult Login(Login lg)
        {
            AngularEntities2 DB = new AngularEntities2();
            var Obj = DB.Usp_Login(lg.Email, lg.Password).ToList<Usp_Login_Result>().FirstOrDefault();
            if (Obj == null) return NotFound();
            /* if (Obj.Status == -1) return new Response
             {
                 Status = "Inactive",
                 Message = "User Inactive"
             };*/
            else return Ok(Obj.UserType);
            /*return new Response
        {
            Status = "Success",
            Message = lg.Email
        };*/

        }




        [HttpGet]
        [Route("AllUserDetails")]
        public IQueryable<UserCRUD> GetUser()
        {
            try
            {
                return ctx.Users;
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
            UserCRUD objUsr = new UserCRUD();
            int ID = Convert.ToInt32(userId);
            try
            {
                objUsr = ctx.Users.Find(ID);
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
        public IHttpActionResult PostUser(UserCRUD data)
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
                        ctx.Users.Add(data);
                        ctx.SaveChanges();
                    }
                    else
                    {
                        data.UserType = Convert.ToInt32(UserType.User);
                        ctx.Users.Add(data);
                        ctx.SaveChanges();
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
        public IHttpActionResult PutUserMaster(UserCRUD user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                UserCRUD objUsr = new UserCRUD();
                objUsr = ctx.Users.Find(user.UserId);
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
                int i = ctx.SaveChanges();

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
            UserCRUD user = ctx.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            ctx.Users.Remove(user);
            ctx.SaveChanges();

            return Ok(user);
        }

        [HttpPost]
        [Route("SetAsAdmin")]
        public IHttpActionResult SetUserAdmin(bool checkbox, string email)
        {
            if (checkbox == true)
            {
                UserCRUD user = ctx.Users.Find(email);
                user.UserType = Convert.ToInt32(UserType.CarAdmin);
                return Ok(checkbox);
            }
            else
                return NotFound();
        }
    }
}
