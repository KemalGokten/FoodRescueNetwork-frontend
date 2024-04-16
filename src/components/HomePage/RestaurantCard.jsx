import { Card, Image, Text, BackgroundImage, Box, Center } from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "./ResturantCard.module.css";
import { IoIosStar } from "react-icons/io";
import { Avatar } from "@mantine/core";

const RestaurantCard = ({ restaurantData }) => {
  console.log(restaurantData);
  return (
    <Card
      withBorder
      shadow="xl"
      padding="md"
      component="a"
      target="_blank"
      // TODO: add proper page route here
      href=""
      radius="lg"
    >
      <Card.Section>
        <Box maw={300} mx="auto">
          <BackgroundImage
            className={styles.image}
            src={restaurantData.foodImg}
            h={130}
            radius="sm"
          >
            <Text>
              <Avatar src={restaurantData.logoUrl} alt="it's me" />
            </Text>
          </BackgroundImage>
        </Box>
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {restaurantData.foods.map((food) => {
          return <span> {food} </span>;
        })}
        <Text c="dimmed" size="sm">
          Collect time: {restaurantData.collectTime.startTime} -{" "}
          {restaurantData.collectTime.endTime}
        </Text>
      </Text>

      <Text mt="xs" size="sm">
        <div className={styles.cardFooter}>
          <div className={styles.rating}>
            <IoIosStar fill="green" />
            {restaurantData.rating}
          </div>

          <div className={styles.price}>{restaurantData.price} €</div>
        </div>
      </Text>
    </Card>
  );
};

export default RestaurantCard;
