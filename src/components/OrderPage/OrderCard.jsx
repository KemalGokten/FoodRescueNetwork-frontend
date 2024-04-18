import {
  Card,
  Image,
  Text,
  BackgroundImage,
  Box,
  Center,
  Flex,
  Rating,
} from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "./OrderCard.module.css";
import { IoIosStar } from "react-icons/io";
import { Avatar } from "@mantine/core";
import { useState } from "react";

const OrderCard = ({ restaurantData }) => {
  const [rating, setRating] = useState(restaurantData.score || null);

  return (
    <Card
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
          <Text p={16}>
            {" "}
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
          </Text>
        </Box>
      </Card.Section>

      <Text mt="xs" size="sm">
        <div className={styles.cardFooter}>
          {rating !== null ? (
            <Rating value={rating}  readOnly/>
          ) : (
            <Rating value={rating} onChange={setRating} />
          )}
        </div>
      </Text>
    </Card>
  );
};

export default OrderCard;
