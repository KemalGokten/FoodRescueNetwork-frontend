import GetRestaurants from "../components/GetRestaurants";
import RestaurantCard from "../components/HomePage/RestaurantCard";
import {useState , useEffect } from 'react'
 

const RestaurantsPage = () => {

  const [restaurants, setRestaurants] = useState();

  useEffect(() => {
    const getRestaurants = async () => {
      try {
          const restaurantsData = await GetRestaurants();
          setRestaurants(restaurantsData);
         
      } catch (error) {
        console.log(error, "on getting restaurants");
      }
    };

    getRestaurants();
  }, []);

  return (
    <>
      <h1>Restaurants</h1>
      {restaurants && restaurants.map((restaurant)=>
      <RestaurantCard key={restaurant.id} restaurantData={restaurant}/>
    )}
    </>
  );
};

export default RestaurantsPage;
