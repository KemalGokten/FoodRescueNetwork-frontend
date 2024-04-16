import { Link } from "react-router-dom";
import { Carousels } from "./Carousels.jsx";

const AllRestaurants = ({ restaurants }) => {
  return (
    <>
      <h3>All Restaurants : </h3> 
      <Link to="/restaurants">Show All </Link>
      <Carousels restaurantsData={restaurants} />
    </>
  );
};

export default AllRestaurants;
