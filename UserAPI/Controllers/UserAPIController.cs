using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using UserAPI.Models;
using UserAPI.Models.Enums;
using static UserAPI.Models.Login;

namespace UserAPI.Controllers
{
    [RoutePrefix("Api/User")]
    public class UserAPIController : ApiController
    {
        AngularEntities4 objEntity = new AngularEntities4();
       
        [Route("UserLogin")]
        [HttpPost]
        public IHttpActionResult Login(Login lg)
        {
            AngularEntities4 DB = new AngularEntities4();
            var Obj = DB.Usp_Login(lg.Email, lg.Password).ToList<Usp_Login_Result>().FirstOrDefault();
            if (Obj == null) return NotFound();
      
            else return Ok(Obj);
       
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

        ///za pretragu i prikaz
        ///

        [HttpGet]
        [Route("GetUserByName")]
        public IHttpActionResult GetUserByName(string userName)
        {
            UserDetail objUsr = new UserDetail();
            try
            {
                objUsr = objEntity.UserDetails.Where(user => user.Name.Contains(userName)).FirstOrDefault();

                if (objUsr == null)
                    return NotFound();

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objUsr);
        }


        [HttpGet]
        [Route("GetUserDetailsByEmail")]
        public IHttpActionResult GetUserDetailsByEmail(string userEmail)
        {
            UserDetail objUsr = new UserDetail();

            try
            {
                objUsr = objEntity.UserDetails.Where(user => user.Email == userEmail).FirstOrDefault();

                if (objUsr == null)
                    return NotFound();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objUsr);
        }


        [HttpGet]
        [Route("GetUserDetailsByName")]
        public IQueryable<UserDetail> GetUserDetailsByName(string userName)
        {
            try
            {
                return objEntity.UserDetails.Where(user => user.Name.Contains(userName));
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet]
        [Route("GetUserDetailsByLastName")]
        public IQueryable<UserDetail> GetUserDetailsByLastName(string userName)
        {
            try
            {
                return objEntity.UserDetails.Where(user => user.LastName.Contains(userName));
            }
            catch (Exception)
            {
                throw;
            }
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
                        SendActivationEmail(data);
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

        private void SendActivationEmail(UserDetail user)
        {
            Guid activationCode = Guid.NewGuid();
            
            objEntity.UserActivations.Add(new UserActivation
            {
                UserId = user.UserId,
                ActivationCode = activationCode
            });
            objEntity.SaveChanges();

            using (MailMessage mm = new MailMessage("snjava1195@gmail.com", user.Email))
            {
                mm.Subject = "Account Activation";
                string body = "Hello " + user.Email + ",";
                body += "<br /><br />Please click the following link to activate your account";
                body += "<br /><a href = '" + string.Format("http://localhost:4200/verification/{0}",activationCode) + "'>Click here to activate your account.</a>";
                body += "<br /><br />Thanks";
                mm.Body = body;
                mm.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.EnableSsl = true;
                //smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                NetworkCredential NetworkCred = new NetworkCredential("snjava1195@gmail.com", "11208995vs");
                //smtp.Timeout = 10000;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = NetworkCred;
                smtp.Port = 587;
                smtp.Send(mm);
            }
        }

        [HttpPost]
        [Route("DeleteToken")]
        public IHttpActionResult DeleteToken(string userToken)
        {
            Guid activationCode = new Guid(userToken.ToString());
     
            UserActivation userActivation = objEntity.UserActivations.Where(p => p.ActivationCode == activationCode).FirstOrDefault();
            if (userActivation != null)
            {
                objEntity.UserActivations.Remove(userActivation);
                objEntity.SaveChanges();
            }
                return Ok();
        }






    }
}

