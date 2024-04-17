import GetRestaurants from "../components/GetRestaurants";
import RestaurantCard from "../components/HomePage/RestaurantCard";
import { useState, useEffect } from "react";
import { Select } from "@mantine/core";
import orderRestaurants from "../components/OrderRestaurantsBy";
import FilterRestaurantsBy from "../components/FilterRestaurantsBy";

const RestaurantsPage = ({searchBar}) => {
  const [restaurants, setRestaurants] = useState(null);
  const [tempRestaurants, setTempRestaurants] = useState(restaurants);

  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const restaurantsData = await GetRestaurants();
        setRestaurants(restaurantsData);

        const searchedRestaurants = FilterRestaurantsBy(
          restaurantsData,
          searchBar,
        );
  
        
        const filteredRestaurants = FilterRestaurantsBy(
          searchedRestaurants,
          filterBy,
        );
      
        const sortedRestaurants = orderRestaurants(filteredRestaurants, sortBy);
  
      
        setTempRestaurants(sortedRestaurants);
      } catch (error) {
        console.log(error, "on getting restaurants");
      }
    };

    getRestaurants();
  }, []);

  useEffect(() => {
    if (restaurants) {

      
      const searchedRestaurants = FilterRestaurantsBy(
        restaurants,
        searchBar,
      );

      
      const filteredRestaurants = FilterRestaurantsBy(
        searchedRestaurants,
        filterBy,
      );
    
      const sortedRestaurants = orderRestaurants(filteredRestaurants, sortBy);

    
      setTempRestaurants(sortedRestaurants);
    }
  }, [sortBy, filterBy , searchBar]);

  return (
    <>
      <h1>Restaurants</h1>
      <Select
        value={sortBy}
        label="Sort by"
        onChange={setSortBy}
        data={["Most Popular", "Price", "Distance"]}
        clearable
        allowDeselect
      />
      <Select
        value={filterBy}
        label="Filter by Date"
        onChange={setFilterBy}
        data={["Today", "Tomorrow"]}
        clearable
        allowDeselect
      />
      {tempRestaurants &&
        tempRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurantData={restaurant} />
        ))}
    </>
  );
};

export default RestaurantsPage;
