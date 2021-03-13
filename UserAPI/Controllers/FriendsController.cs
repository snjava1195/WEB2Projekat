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



        [HttpGet]
        [Route("FriendsOrNot")]
        public bool FriendsOrNot(string sender, string notified)
        {
            bool f = false;

            int senderID = Convert.ToInt32(sender);
            int notifiedID = Convert.ToInt32(notified);

            foreach (Friendship friendship in objEntity.Friendships)
                if (((friendship.Friend1 == senderID) && (friendship.Friend2 == notifiedID)) ||
                    ((friendship.Friend2 == senderID) && (friendship.Friend1 == notifiedID)))
                    f = true;

            return f;
        }

        [HttpGet]
        [Route("SentRequests")]
        public List<string> SentRequests(string sender)
        {
            int senderID = Convert.ToInt32(sender);
            List<string> namesOfUsersToNotify = new List<string>();

            try
            {
                foreach (FriendRequest request in objEntity.FriendRequests.Where(r => r.Sender == senderID))
                    namesOfUsersToNotify.Add(objEntity.UserDetails.Find(request.ToNotify).Name + ' ' +
                        objEntity.UserDetails.Find(request.ToNotify).LastName);

                if (namesOfUsersToNotify.Count == 0)
                    return null;
                else
                    return namesOfUsersToNotify;
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet]
        [Route("GotRequests")]
        public List<string> GotRequests(string notified)
        {
            int notifiedID = Convert.ToInt32(notified);
            List<string> namesOfSenders = new List<string>();

            try
            {
                foreach (FriendRequest request in objEntity.FriendRequests.Where(r => r.ToNotify == notifiedID))
                    namesOfSenders.Add(objEntity.UserDetails.Find(request.Sender).Name + ' ' +
                        objEntity.UserDetails.Find(request.Sender).LastName);

                if (namesOfSenders.Count == 0)
                    return null;
                else
                    return namesOfSenders;
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        [Route("SendRequest")]
        public IHttpActionResult SendRequest(FriendRequest request)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                objEntity.FriendRequests.Add(request);
                objEntity.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(request);
        }


        [HttpPost]
        [Route("AcceptRequest")]
        public IHttpActionResult AcceptRequest(Friendship friendship)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                objEntity.Friendships.Add(friendship);
                objEntity.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(friendship);
        }


        [HttpDelete]
        [Route("RemoveRequest")]
        public IHttpActionResult RemoveRequest(int sender, int notified)
        {
            FriendRequest request = objEntity.FriendRequests.Where(r => (((r.Sender == sender) && (r.ToNotify == notified))
                                                                 || ((r.Sender == notified) && (r.ToNotify == sender)))).FirstOrDefault();

            if (request == null)
                return NotFound();


            objEntity.FriendRequests.Remove(request);
            objEntity.SaveChanges();

            return Ok(request);
        }


        [HttpDelete]
        [Route("RemoveFriend")]
        public IHttpActionResult RemoveFriend(string friend1, string friend2)
        {
            int fr1ID = Convert.ToInt32(friend1);
            int fr2ID = Convert.ToInt32(friend2);

            Friendship friendship = objEntity.Friendships.Where(f => (((f.Friend1 == fr1ID) && (f.Friend2 == fr2ID))
                                                                   || ((f.Friend1 == fr2ID) && (f.Friend2 == fr1ID)))).FirstOrDefault();

            if (friendship == null)
                return NotFound();

            objEntity.Friendships.Remove(friendship);
            objEntity.SaveChanges();

            return Ok(friendship);

        }





    }
}
