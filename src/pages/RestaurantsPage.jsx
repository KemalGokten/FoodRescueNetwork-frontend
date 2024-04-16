import GetRestaurants from "../components/GetRestaurants";
import RestaurantCard from "../components/HomePage/RestaurantCard";
import { useState, useEffect } from "react";
import { NativeSelect } from "@mantine/core";
import orderRestaurants from "../components/OrderRestaurantsBy";
import FilterRestaurantsBy from "../components/FilterRestaurantsBy";

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [tempRestaurants, setTempRestaurants] = useState(restaurants);

  const [sortBy, setSortBy] = useState("Most Popular");
  const [filterBy, setFilterBy] = useState("Pizza");

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
      <NativeSelect
        value={sortBy}
        label="Sort by"
        onChange={(event) => setSortBy(event.currentTarget.value)}
        data={["Most Popular", "Price", "Distance"]}
      />
      <NativeSelect
        value={filterBy}
        label="Filter by"
        onChange={(event) => setFilterBy(event.currentTarget.value)}
        data={["Pizza", "Burger", "Noodles"]}
      />
      {tempRestaurants &&
        tempRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurantData={restaurant} />
        ))}
    </>
  );
};

export default RestaurantsPage;
