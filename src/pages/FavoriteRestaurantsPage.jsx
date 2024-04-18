import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import RestaurantCard from "../components/HomePage/RestaurantCard";

const FavoriteRestaurantsPage = () => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const { user } = useContext(AuthContext);

  const getFavorites = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/userFavorites?userId=${user.id}`
      );

      if (response.ok) {
        const favoritesRestaurantIds = await response.json();
        const promises =
         favoritesRestaurantIds[0].favoriteRestaurants.map(async (id) => {
            try {
              const response = await fetch(
                `${import.meta.env.VITE_API_URL}/restaurants/${id}`
              );
              if (response.ok) {
                const restaurantData = response.json();
                return restaurantData;
              }
            } catch (error) {
              console.log("Error by fetching restaurant based on Id", error);
            }
          });

          const resolvedFavoriteRestaurants = await Promise.all(promises);
        setFavoriteRestaurants(resolvedFavoriteRestaurants);
      }
    } catch (error) {
      console.log("error by fetching favorites", error);
    }
  };

  useEffect(()=>{
    getFavorites();
  },[])

  return (
    <>
      <h1>Favorite Restaurants Page</h1>
      {favoriteRestaurants.map((favoriteRestaurant,index) => {
        return <RestaurantCard  key={index} restaurantData={favoriteRestaurant} />;
      })}
    </>
  );
};

export default FavoriteRestaurantsPage;
