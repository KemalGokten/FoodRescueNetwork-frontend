import Navbar from "../components/Navbar/Navbar";
import AllRestaurants from "../components/HomePage/AllRestaurants";
import HighlyRecommendedRestaurants from "../components/HomePage/HighlyRecommendedRestaurants";
import RandomChoices from "../components/HomePage/RandomChoices";

import { useEffect, useState } from "react";
import GetRestaurants from "../components/GetRestaurants";
import orderRestaurants from "../components/OrderRestaurantsBy";

const HomePage = () => {

  const [restaurants, setRestaurants] = useState(null);
  const [restaurantsByRating, setRestaurantsByRating] = useState(null);
  const [restrauntsByRandom, setRestrauntsByRandom] = useState(null);

  function setRandomRestaurants(restaurantsData) {
    const randoms = new Set();
    let numberOfRestaurant = 6;

    if (restaurantsData.length < numberOfRestaurant) {
      numberOfRestaurant = restaurantsData.length;
    }

    while (randoms.size < numberOfRestaurant) {
      const randomIndex = Math.floor(Math.random() * restaurantsData.length);
      randoms.add(restaurantsData[randomIndex]);
    }

    setRestrauntsByRandom([...randoms]);
  }

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const restaurantsData = await GetRestaurants();
        setRestaurants(restaurantsData.slice(0, 6));

        const sortedRestaurants = await orderRestaurants(restaurantsData);
        setRestaurantsByRating(sortedRestaurants.slice(0, 6));

        setRandomRestaurants(restaurantsData);
      } catch (error) {
        console.log(error, "on getting restaurants");
      }
    };

    getRestaurants();
  }, []);

  return (
    <>
      
      <HighlyRecommendedRestaurants restaurants={restaurantsByRating} />
      <RandomChoices restaurants={restrauntsByRandom} />
      <AllRestaurants restaurants={restaurants} />
    </>
  );
};

export default HomePage;
