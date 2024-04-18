import { Carousels } from "./Carousels.jsx";
const HighlyRecommendedRestaurants = ({ restaurants }) => {
  return (
    <>
      <h3 style={{ fontFamily: "Georgia, serif" }}>
        Highly Recommended Restaurants:
      </h3>

      <Carousels restaurantsData={restaurants} />
    </>
  );
};

export default HighlyRecommendedRestaurants;
