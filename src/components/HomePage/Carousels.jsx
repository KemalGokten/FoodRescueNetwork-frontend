import { Carousel } from "@mantine/carousel";
import RestaurantCard from "./RestaurantCard";

export const Carousels = ({ restaurantsData }) => {

  return (
    <Carousel
      withIndicators
      height={200}
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={3}
    >
      {restaurantsData &&
        restaurantsData.map((restaurant) => {
          return (
            <Carousel.Slide key={restaurant.id}>
              <RestaurantCard restaurantData={restaurant} />
            </Carousel.Slide>
          );
        })}
    </Carousel>
  );
};
