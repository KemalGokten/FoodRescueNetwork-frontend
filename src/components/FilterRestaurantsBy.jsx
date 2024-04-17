const FilterRestaurantsBy = (restaurantsData, filterBy) => {
  if (filterBy) {
    return restaurantsData.filter((restaurant) => {
      if (filterBy === "Today") {
        return restaurant.date.today;
      }
      if (filterBy === "Tomorrow") {
        return restaurant.date.tomorrow;
      }
      else{
        return restaurant.foods.includes(filterBy);     
      }
    });
  }
  return restaurantsData;
};

export default FilterRestaurantsBy;
