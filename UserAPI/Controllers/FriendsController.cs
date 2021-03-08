using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using UserAPI.Models;

namespace UserAPI.Controllers
{

    [RoutePrefix("Api/Friend")]
    public class FriendsController : ApiController
    {

        AngularEntities4 objEntity = new AngularEntities4();


        [HttpGet]
        [Route("UsersFriends")]
        public IQueryable<UserDetail> GetUsersFriends(string userId)
        {
            int ID = Convert.ToInt32(userId);
            try
            {
                List<Friendship> usersFriendships = objEntity.Friendships.Where(friends => friends.Friend1 == ID).ToList();

                foreach (Friendship friendship in objEntity.Friendships.Where(friends => friends.Friend2 == ID).ToList())
                    usersFriendships.Add(friendship);


                List<int> usersFriendsIds = new List<int>();

                foreach (Friendship uf in usersFriendships)
                    if (uf.Friend1 == ID)
                        usersFriendsIds.Add((int)uf.Friend2);
                    else
                        usersFriendsIds.Add((int)uf.Friend1);


                return objEntity.UserDetails.Where(u => usersFriendsIds.Contains(u.UserId));

            }
            catch (Exception)
            {
                throw;
            }
        }





    }
}
