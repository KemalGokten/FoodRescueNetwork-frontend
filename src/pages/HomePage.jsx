import Navbar from "../components/Navbar/Navbar";
import AllRestaurants from "../components/HomePage/AllRestaurants";
import HighlyRecommendedRestaurants from "../components/HomePage/HighlyRecommendedRestaurants";
import RandomChoices from "../components/HomePage/RandomChoices";

import { useEffect, useState } from "react";
import GetRestaurants from "../components/GetRestaurants";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [restaurantsByRating, setRestaurantsByRating] = useState(null);
  const [restrauntsByRandom, setRestrauntsByRandom] = useState(null);

  function setHighlyRecommendedRestaurants(restaurantsData) {
    const sortedRestaurants = restaurantsData.toSorted(
      (restaurant1, restaurant2) => {
        if (restaurant1.rating > restaurant2.rating) {
          return -1;
        }
        if (restaurant1.rating < restaurant2.rating) {
          return 1;
        }
        return 0;
      }
    );
    setRestaurantsByRating(sortedRestaurants.slice(0, 6));
  }

  function setRandomRestaurants(restaurantsData) {
    const randoms = new Set();
    let numberOfRestaurant = 6;

    if(restaurantsData.length < numberOfRestaurant){
      numberOfRestaurant = restaurantsData.length;
    }

    while(randoms.size < numberOfRestaurant ){
      const randomIndex = Math.floor(Math.random() * restaurantsData.length);
      randoms.add(restaurantsData[randomIndex]);
    }

    setRestrauntsByRandom([...randoms]);
  }

  useEffect(() => {
    const getRestaurants = async () => {
      try {
          const restaurantsData = await GetRestaurants();
          setRestaurants(restaurantsData.slice(0,6));
          setHighlyRecommendedRestaurants(restaurantsData);
          setRandomRestaurants(restaurantsData);
      } catch (error) {
        console.log(error, "on getting restaurants");
      }
    };

    getRestaurants();
  }, []);

  return (
    <>
      <Navbar />
      <h1>Home Page</h1>
      <HighlyRecommendedRestaurants restaurants={restaurantsByRating} />
      <RandomChoices restaurants={restrauntsByRandom} />
      <AllRestaurants restaurants={restaurants} />
    </>
  );
};

export default HomePage;
