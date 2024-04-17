import GetRestaurants from "../components/GetRestaurants";
import RestaurantCard from "../components/HomePage/RestaurantCard";
import { useState, useEffect } from "react";
import { NativeSelect, Select } from "@mantine/core";
import orderRestaurants from "../components/OrderRestaurantsBy";
import FilterRestaurantsBy from "../components/FilterRestaurantsBy";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [tempRestaurants, setTempRestaurants] = useState(restaurants);

  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const restaurantsData = await GetRestaurants();

        setRestaurants(restaurantsData);

        const sortedRestaurants = orderRestaurants(restaurantsData, sortBy);
        const filteredRestaurants = FilterRestaurantsBy(
          sortedRestaurants,
          filterBy
        );
        setTempRestaurants(filteredRestaurants);
      } catch (error) {
        console.log(error, "on getting restaurants");
      }
    };

    getRestaurants();
  }, []);

  useEffect(() => {
    if (restaurants) {
      const sortedRestaurants = orderRestaurants(restaurants, sortBy);
      const filteredRestaurants = FilterRestaurantsBy(
        sortedRestaurants,
        filterBy
      );
      setTempRestaurants(filteredRestaurants);
    }
  }, [sortBy, filterBy]);

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
        label="Filter by"
        onChange={setFilterBy}
        data={["Pizza", "Burger", "Noodles"]}
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
