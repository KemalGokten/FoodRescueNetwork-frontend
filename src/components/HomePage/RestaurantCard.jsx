import {
  Card,
  Text,
  BackgroundImage,
  Box,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ResturantCard.module.css";
import { IoIosStar } from "react-icons/io";
import { Avatar } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect } from "react";

const RestaurantCard = ({restaurantData }) => {
  const { user } = useContext(AuthContext);
  const [favoritesData, setFavoritesData] = useState([]);
  const [isFilled, setIsFilled] = useState(false);

  const navigate = useNavigate();

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

  const onClickCard =() => {
    navigate(`/restaurants/${restaurantData.id}`,{state:{restaurantData:restaurantData}});
  }

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
      onClick={onClickCard}
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
