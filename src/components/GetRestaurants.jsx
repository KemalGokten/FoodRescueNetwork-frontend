const GetRestaurants = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/restaurants`);
    if (response.ok) {
      const restaurantsData = await response.json();
      return restaurantsData;
    } else {
      console.log("Response is not okay for getting restaurants");
    }
  } catch (error) {
    console.log(error, "on getting restaurants");
  }
};

export default GetRestaurants;
