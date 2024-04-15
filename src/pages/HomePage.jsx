import Navbar from "../components/Navbar/Navbar";
import AllRestaurants from "../components/HomePage/AllRestaurants";
import HighlyRecommendedRestaurants from "../components/HomePage/HighlyRecommendedRestaurants";
import RandomChoices from "../components/HomePage/RandomChoices";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <h1>Home Page</h1>
      <HighlyRecommendedRestaurants />
      <RandomChoices />
      <AllRestaurants />
    </>
  );
};

export default HomePage;
