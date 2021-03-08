using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using UserAPI.Models;

namespace UserAPI.Controllers
{
    [RoutePrefix("Api/Car")]
    public class CarController : ApiController
    {
        AngularEntities4 objEntity = new AngularEntities4();


        [HttpGet]
        [Route("AllCars")]
        public IQueryable<Car> GetCars()
        {
            try
            {
                return objEntity.Cars;
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet]
        [Route("CarsFromRentaCar")]
        public IQueryable<Car> GetCarsFromRentaCar(int rentaCarID)
        {
            try
            {
                return objEntity.Cars.Where(c => c.RentaCarId == rentaCarID);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet]
        [Route("GetCarById/{carId}")]
        public IHttpActionResult GeCarById(string carId)
        {
            Car car = new Car();
            int ID = Convert.ToInt32(carId);

            try
            {
                car = objEntity.Cars.Find(ID);
                if (car == null)
                    return NotFound();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(car);
        }


        [HttpGet]
        [Route("GetCarByName/{carName}")]
        public IQueryable<Car> GetCarByName(string carName)
        {
            string ifSmall = carName.First().ToString().ToUpper() +
                String.Join("", carName.Skip(1));

            try
            {
                return objEntity.Cars.Where(c => c.Name.Contains(carName) && c.Name.Contains(ifSmall));
            }
            catch (Exception)
            {
                throw;
            }

        }


        [HttpGet]
        [Route("GetCarByRate")]
        public IQueryable<Car> GetCarRate(double carRate)
        {
            try
            {
                return objEntity.Cars.Where(c => Math.Abs((double)c.Rate - carRate) < 0.5);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet]
        [Route("GetCarByPrice")]
        public IQueryable<Car> GetCarPrice(double min, double max)
        {
            try
            {
                return objEntity.Cars.Where(c => c.Price >= min && c.Price <= max);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet]
        [Route("GetCarsByType")]
        public IQueryable<Car> GetCarsType(int type)
        {
            try
            {
                return objEntity.Cars.Where(t => t.Type == type);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetCarsBySeats")]
        public IQueryable<Car> GetCarsBySeats(int seats)
        {
            try
            {
                return objEntity.Cars.Where(s => s.Seats >= seats);
            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpGet]
        [Route("SearchedCars")]
        public IQueryable<Car> SearchedCars(int rentaCarId, int type, int seats,
            double minPrice, double maxPrice)
        {
            IQueryable<Car> searchedCars = GetCarsFromRentaCar(rentaCarId);

            try
            {
                searchedCars = searchedCars.Intersect(GetCarsType(type));
                searchedCars = searchedCars.Intersect(GetCarsBySeats(seats));
                searchedCars = searchedCars.Intersect(GetCarPrice(minPrice, maxPrice));

                return searchedCars;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        [Route("InsertCar")]
        public IHttpActionResult PostCar(Car data)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                data.Rate = 0;
                data.RatedBy = 0;
                data.Reserved = false;

                objEntity.Cars.Add(data);
                objEntity.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(data);
        }


        [HttpPut]
        [Route("UpdateCar")]
        public IHttpActionResult PutCar(Car data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Car car = new Car();
                car = objEntity.Cars.Find(data.Id);

                if (car != null)
                {
                    car.Id = data.Id;
                    car.Name = data.Name;
                    car.Rate = data.Rate;
                    car.RatedBy = data.RatedBy;
                    car.Price = data.Price;
                    car.RentaCarId = data.RentaCarId;
                    car.Reserved = data.Reserved;
                    car.Seats = data.Seats;
                    car.Type = data.Type;
                    car.Brand = data.Brand;
                }
                objEntity.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
            return Ok(data);
        }





        [HttpDelete]
        [Route("DeleteCar")]
        public IHttpActionResult DeleteCar(int id)
        {
            Car car = objEntity.Cars.Find(id);
            if (car == null)
            {
                return NotFound();
            }

            objEntity.Cars.Remove(car);
            objEntity.SaveChanges();

            return Ok(car);
        }






    }
}
