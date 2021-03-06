﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UserAPI.Models;
using UserAPI.Models.Enums;

namespace UserAPI.Controllers
{
    [RoutePrefix("Api/Admin")]
    public class AdminController : ApiController
    {
        AngularEntities4 objEntity = new AngularEntities4();

        [Route("SetAsCarAdmin")]
        [HttpPost]
        public IHttpActionResult SetUserAdmin(string email)
        {
            using (var objEntity = new AngularEntities4())
            {
                var user = from u in objEntity.UserDetails where (u.Email == email) select u;
                if (user != null)
                {
                    var us = user.First();
                    us.UserType = Convert.ToInt32(UserType.CarAdmin);
                    objEntity.SaveChanges();
                    return Ok(email);
                }

                else
                    return NotFound();
            }
        }

        [Route("SetAsAirlineAdmin")]
        [HttpPost]
        public IHttpActionResult SetUserAsAirlineAdmin(string email)
        {
            using (var objEntity = new AngularEntities4())
            {
                var user = from u in objEntity.UserDetails where (u.Email == email) select u;
                if (user != null)
                {
                    var us = user.First();
                    us.UserType = Convert.ToInt32(UserType.AirlineAdmin);
                    objEntity.SaveChanges();
                    return Ok(email);
                }

                else
                    return NotFound();
            }
        }
    }
}
