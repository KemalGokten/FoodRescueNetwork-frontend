import {
  Card,
  Text,
  BackgroundImage,
  Box,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "./ResturantCard.module.css";
import { IoIosStar } from "react-icons/io";
import { Avatar } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useState } from "react";

const RestaurantCard = ({ restaurantData }) => {
  const [isFilled, setIsFilled] = useState(false);
  function onClickFavarite() {
    setIsFilled(!isFilled);
  }

  return (
    <Card
      my={16}
      withBorder
      shadow="xl"
      padding="md"
      component="a"
      target="_blank"
      // TODO: add proper page route here
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
      <Flex justify={"space-between"} align={"center"} mt="md">
        <Text fw={500} size="lg">
          {restaurantData.foods.map((food, index) => {
            return (
              <span key={index} className={styles.food}>
                {" "}
                {food}{" "}
              </span>
            );
          })}
        </Text>

        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart
            onClick={onClickFavarite}
            className={styles.like}
            stroke={1.5}
            fill={isFilled ? "red" : "transparent"}
          />
        </ActionIcon>
      </Flex>

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
