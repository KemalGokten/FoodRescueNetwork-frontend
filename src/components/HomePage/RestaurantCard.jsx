import { Card, Image, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurantData }) => {
  return (
    <Card shadow="sm" padding="xl" component="a" target="_blank">
      <Card.Section>
          <Image src={restaurantData.foodImg} h={160} alt="No way!" />
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        <span>{restaurantData.foods}</span>
        <br />
        <span>
          {restaurantData.collectTime.startTime} -{" "}
          {restaurantData.collectTime.endTime}
        </span>
        <br />

        <span>{restaurantData.rating}</span>
        <br />
        <span>{restaurantData.price}</span>
      </Text>

      <Text mt="xs" c="dimmed" size="sm"></Text>
    </Card>
  );
};

export default RestaurantCard;