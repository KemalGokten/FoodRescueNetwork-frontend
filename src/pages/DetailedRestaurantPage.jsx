import { useLocation } from "react-router-dom";

const DetailedRestaurantPage = () => {
    const location = useLocation();
    const {restaurantData} = location.state;

    
  return <><h1>{restaurantData.restaurantName}</h1></>;
};

export default DetailedRestaurantPage;
