
const orderRestaurants = (restaurantsData,sortBy) => {
    switch (sortBy) {
      case "Price":                                                 
        return restaurantsData.toSorted((a, b) => a.price - b.price);
      case "Distance":
        return restaurantsData.toSorted((a, b) => a.distance - b.distance);
      default:
        return restaurantsData.toSorted((a, b) => b.rating - a.rating);
    }
  };
 
export default orderRestaurants ;