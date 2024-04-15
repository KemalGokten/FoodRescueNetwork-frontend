import { Carousel } from "@mantine/carousel";

export const Carousels = () => {
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
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      <Carousel.Slide>4</Carousel.Slide>
      <Carousel.Slide>5</Carousel.Slide>
      <Carousel.Slide>6</Carousel.Slide>

    </Carousel>
  );
};


