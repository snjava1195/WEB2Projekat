using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using UserAPI.Models;

namespace UserAPI
{
    public class UserContext : DbContext
    {
        public UserContext() : base()
        {

        }

        public DbSet<UserCRUD> Users { get; set; }
    }
}