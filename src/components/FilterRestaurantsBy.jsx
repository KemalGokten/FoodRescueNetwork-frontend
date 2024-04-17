const FilterRestaurantsBy = (restaurantsData , filterBy) => {

    if(filterBy){
        return restaurantsData.filter(restaurant => restaurant.foods.includes(filterBy));
    }

    return restaurantsData;
}
 
export default FilterRestaurantsBy;