import {
  Card,
  Image,
  Text,
  BackgroundImage,
  Box,
  Center,
  Flex,
} from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "./ResturantCard.module.css";
import { IoIosStar } from "react-icons/io";
import { Avatar } from "@mantine/core";

const RestaurantCard = ({ restaurantData }) => {
  return (
    <Card
      my={16}
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
        <Box mx="auto" h={130} pos={"relative"} className={styles.boxContainer}>
          <BackgroundImage
            pos={"absolute"}
            classNames={{
              root: styles.image,
            }}
            src={restaurantData.foodImg}
            h={130}
            radius="sm"
          ></BackgroundImage>

          <Flex justify={"flex-start"} align={"center"} gap={8}>
            <Avatar
              p={8}
              bg={"white"}
              src={restaurantData.logoUrl}
              alt="it's me"
            />
            <Text style={{ zIndex: "1" }} fw={700} size="xl" c={"white"}>
              {restaurantData.restaurantName}
            </Text>
          </Flex>
        </Box>
      </Card.Section>

      <Text fw={500} size="lg" mt="md">
        {restaurantData.foods.map((food, index) => {
          return (
            <span key={index} className={styles.food}>
              {" "}
              {food}{" "}
            </span>
          );
        })}
      </Text>
      <Text c="dimmed" size="sm">
        Collect time: {restaurantData.collectTime.startTime} -{" "}
        {restaurantData.collectTime.endTime}
      </Text>

      <Text mt="xs" size="sm">
        <span className={styles.cardFooter}>
          <span className={styles.rating}>
            <IoIosStar fill="green" />
            {restaurantData.rating}
          </span>

          <span className={styles.price}>{restaurantData.price} €</span>
        </span>
      </Text>
    </Card>
  );
};

export default RestaurantCard;
