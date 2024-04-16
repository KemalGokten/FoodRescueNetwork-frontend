const FilterRestaurantsBy = (restaurantsData , filterBy) => {
    return restaurantsData.filter(restaurant => restaurant.foods.includes(filterBy));
}
 
export default FilterRestaurantsBy;