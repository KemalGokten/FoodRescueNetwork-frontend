import { Carousels } from "./Carousels.jsx";
const HighlyRecommendedRestaurants = ({ restaurants }) => {
  return (
    <>
      <h3>Highly Recommended Restaurants : </h3>
      <Carousels restaurantsData={restaurants} />
    </>
  );
};

export default HighlyRecommendedRestaurants;
