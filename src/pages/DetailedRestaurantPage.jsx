import {
  Card,
  Text,
  BackgroundImage,
  Box,
  Flex,
  ActionIcon,
  Button,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { Avatar } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import styles from "./DetailedRestaurantPage.module.css";
import { AuthContext } from "../contexts/AuthContext";
import { FaLocationDot } from "react-icons/fa6";
import { notifications } from "@mantine/notifications";

const DetailedRestaurantPage = () => {
  const { user } = useContext(AuthContext);
  const [favoritesData, setFavoritesData] = useState([]);
  const [isFilled, setIsFilled] = useState(false);
  const [previousOrderData, setPreviousOrderData] = useState(null);

  const getPreviousOrders = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/userOrders?userId=${user.id}`
      );
      if (response.ok) {
        const orderData = await response.json();
        setPreviousOrderData(orderData[0]);
      }
    } catch (error) {
      console.log(error, "on getting previous orders");
    }
  };

  useEffect(() => {
    getPreviousOrders();
    console.log("PreviousOrders :", previousOrderData);
  }, []);

  const navigate = useNavigate();

  const location = useLocation();
  const { restaurantData } = location.state;

  const getRestaurantFavorite = async (onMounting) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/userFavorites?userId=${user.id}`
      );

      if (response.ok) {
        const fetchedFavoritesData = await response.json();

        setFavoritesData(fetchedFavoritesData[0]);
        const userFavorites = fetchedFavoritesData[0].favoriteRestaurants;

        if (userFavorites.includes(restaurantData.id) && onMounting) {
          setIsFilled(true);
        }

        return fetchedFavoritesData[0];
      }
    } catch (error) {
      console.log(error, "on getting previous orders");
    }
  };

  useEffect(() => {
    getRestaurantFavorite(true);
  }, []);

  async function onClickFavorite(event) {
    event.stopPropagation();

    setIsFilled(!isFilled);

    const copyFavoriteRestaurants = await getRestaurantFavorite();

    if (!isFilled) {
      copyFavoriteRestaurants.favoriteRestaurants.push(restaurantData.id);
    } else {
      copyFavoriteRestaurants.favoriteRestaurants =
        copyFavoriteRestaurants.favoriteRestaurants.filter(
          (id) => id !== restaurantData.id
        );
    }
    const payload = {
      ...copyFavoriteRestaurants,
      favoriteRestaurants: copyFavoriteRestaurants.favoriteRestaurants,
    };

    const requestOptions = {
      method: `PUT`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/userFavorites/${
          copyFavoriteRestaurants.id
        }`,
        requestOptions
      );
      if (response.ok) {
        console.log("Favorite liked and pushed to db");
      }
    } catch (error) {
      console.log(error, "on getting previous orders");
    }
  }

  const putOrderToUsetOrder = async () => {
  
   const payload = {
    ...previousOrderData,
  previousOrders: [
    ...previousOrderData.previousOrders,
    {
      restaurantName: restaurantData.restaurantName,
      logoUrl: restaurantData.logoUrl,
      foodImg: restaurantData.foodImg,
      restaurantId: restaurantData.restaurantId,
    },
  ],
};


    const requestOptions = {
      method: `PUT`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/userOrders?userId=${user.id}`
      );

      if (response.ok) {
        const fetchedpreviousOrders = await response.json();
        const dataId = fetchedpreviousOrders[0].id;
        
        const responsePut = await fetch(
          `${import.meta.env.VITE_API_URL}/userOrders/${dataId}`, requestOptions
        );
        if(responsePut.ok){
          console.log("Order has added to db");
          notifications.show({
            title: "Order Now",
            message:
              "Hey there, you succesfuly ordered from this restaurant",
          });
        }
      }
    } catch (error) {
      console.log(error, "on setting previous orders");
    }
  };

  function addToOrders() {
    console.log("add to order");
    putOrderToUsetOrder();
  }

  return (
    <Card
      my={16}
      withBorder
      padding="md"
      component="a"
      target="_blank"
      // TODO: add proper page route here
      radius="md"
    >
      <Card.Section>
        <Box mx="auto" h={500} pos={"relative"} className={styles.boxContainer}>
          <BackgroundImage
            pos={"absolute"}
            classNames={{
              root: styles.image,
            }}
            src={restaurantData.foodImg}
            h={500}
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
        <Text fw={500} size="xl">
          {restaurantData.foods.map((food, index) => {
            return (
              <span key={index} className={styles.food}>
                {" "}
                {food}{" "}
              </span>
            );
          })}
        </Text>

        <ActionIcon
          variant="default"
          radius="md"
          size={36}
          onClick={onClickFavorite}
        >
          <IconHeart
            className={styles.like}
            stroke={1.5}
            fill={isFilled ? "red" : "transparent"}
          />
        </ActionIcon>
      </Flex>
      <Text fw={200} size="md" mb={15} mt={15}>
        <span>Food description: {restaurantData.description}</span>
      </Text>

      <Text c="dimmed" size="sm">
        Collect time: {restaurantData.collectTime.startTime} -{" "}
        {restaurantData.collectTime.endTime}
      </Text>

      <Text mt="25" size="sm">
        <FaLocationDot /> {restaurantData.address.street}{" "}
        {restaurantData.address.houseNumber} {" , "}
        {restaurantData.address.postalCode} {restaurantData.address.city}{" "}
        {" - "}
        {restaurantData.address.country}
      </Text>

      <Text mt="xs" size="sm">
        <span className={styles.cardFooter}>
          <span className={styles.rating}>
            <IoIosStar fill="green" />
            {restaurantData.rating}
          </span>
          <Flex className={styles.price} justify={"space-between"} al>
            <span style={{ textDecoration: "line-through" }}>
              {restaurantData.price} €
            </span>
            <span>{restaurantData.discountPrice} € </span>
          </Flex>
        </span>
      </Text>
      <button
        style={{
          marginTop: "15px",
          borderRadius: "5px",
          backgroundColor: "green",
          color: "white",
        }}
        onClick={addToOrders}
      >
        Order now
      </button>
    </Card>
  );
};

export default DetailedRestaurantPage;
