import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import {
  Button,
  Group,
  PasswordInput,
  TextInput,
  Flex,
  Checkbox,
  NativeSelect,
  JsonInput,
  MultiSelect,
  Textarea,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";

const SignupRestaurant = () => {
  const { user, setUser } = useContext(AuthContext);

  function createRandomRating() {
    const randomRating = Math.random() * 5;
    const limitedRating = randomRating.toFixed(1);
    return Number(limitedRating);
  }

  const [restaurant, setRestaurant] = useState({
    logoUrl: "",
    foodImg: "",
    restaurantName: "",
    rating: createRandomRating(),
    address: {
      country: "Germany",
      city: "Berlin",
      street: "",
      houseNumber: "",
      postalCode: "",
    },
    price: "",
    discountPrice: "",
    collectTime: {
      startTime: "",
      endTime: "",
    },
    date: {
      today: false,
      tomorrow: false,
    },
    description: "",
    foods: [],
  });

  const insertRestaurant = async (e) => {
    e.preventDefault();

    const payload = restaurant;

    const requestOptions = {
      method: `POST`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/restaurants`,
        requestOptions
      );
      if (response.ok) {
        notifications.show({
          title: "Signup a new restaurant",
          message: "Hey there, you succesfuly signed up your restaurant",
        });
      }
    } catch (error) {
      console.log(error, "on signing a new restaurant");
    }
  };

  return (
    <Flex direction="column" justify="center" align="center">
      <form onSubmit={(e) => insertRestaurant(e)}>
        <Flex direction={"column"} gap={16} w={350}>
          <TextInput
            mt={32}
            label="Restaurant Name"
            placeholder="Restaurant Name"
            required
            onChange={(event) =>
              setRestaurant({
                ...restaurant,
                restaurantName: event.target.value,
              })
            }
            value={restaurant.restaurantName}
          />

          <TextInput
            label="Logo of the restaurant"
            placeholder="Url link for the image"
            value={restaurant.fullName}
            onChange={(event) =>
              setRestaurant({ ...restaurant, logoUrl: event.target.value })
            }
            required
          />
          <TextInput
            label="Food image"
            placeholder="Url link for the food image"
            required
            onChange={(event) =>
              setRestaurant({ ...restaurant, foodImg: event.target.value })
            }
            value={restaurant.foodImg}
          />

          <NativeSelect
            label="Country"
            placeholder="Country"
            required
            onChange={(event) =>
              setRestaurant({
                ...restaurant,
                address: { ...restaurant.address, country: event.target.value },
              })
            }
            value={restaurant.address.country}
            data={["Germany", "Spain"]}
          />

          <NativeSelect
            label="City"
            placeholder="City"
            required
            onChange={(event) =>
              setRestaurant({
                ...restaurant,
                address: { ...restaurant.address, city: event.target.value },
              })
            }
            value={restaurant.address.city}
            data={["Berlin", "Hamburg"]}
          />

          <TextInput
            label="Street"
            placeholder="Street"
            required
            onChange={(event) =>
              setRestaurant({
                ...restaurant,
                address: { ...restaurant.address, street: event.target.value },
              })
            }
            value={restaurant.address.street}
          />

          <TextInput
            label="House Number"
            placeholder="House Number"
            required
            onChange={(event) =>
              setRestaurant({
                ...restaurant,
                address: {
                  ...restaurant.address,
                  houseNumber: event.target.value,
                },
              })
            }
            value={restaurant.address.houseNumber}
          />

          <TextInput
            label="Postal Code"
            placeholder="Postal Code"
            required
            onChange={(event) =>
              setRestaurant({
                ...restaurant,
                address: {
                  ...restaurant.address,
                  postalCode: event.target.value,
                },
              })
            }
            value={restaurant.address.postalCode}
          />

          <TextInput
            label="Price"
            placeholder="Price"
            required
            onChange={(event) =>
              setRestaurant({ ...restaurant, price: event.target.value })
            }
            value={restaurant.price}
          />

          <TextInput
            label="Discount Price"
            placeholder="Discount Price"
            required
            onChange={(event) =>
              setRestaurant({
                ...restaurant,
                discountPrice: event.target.value,
              })
            }
            value={restaurant.discountPrice}
          />

          <TimeInput
            label="Start Time"
            placeholder="Start Time"
            required
            onChange={(event) =>
              setRestaurant({
                ...restaurant,
                collectTime: {
                  ...restaurant.collectTime,
                  startTime: event.target.value,
                },
              })
            }
            value={restaurant.collectTime.startTime}
          />

          <TimeInput
            label="End Time"
            placeholder="End Time"
            required
            onChange={(event) =>
              setRestaurant({
                ...restaurant,
                collectTime: {
                  ...restaurant.collectTime,
                  endTime: event.target.value,
                },
              })
            }
            value={restaurant.collectTime.endTime}
          />

          <Textarea
            label="Description"
            placeholder="Description"
            required
            onChange={(event) =>
              setRestaurant({
                ...restaurant,
                description: event.currentTarget.value,
              })
            }
            value={restaurant.description}
            autosize
            minRows={2}
          />

          <MultiSelect
            label="Foods"
            placeholder="Foods"
            required
            onChange={(value) =>
              setRestaurant({
                ...restaurant,
                foods: value,
              })
            }
            value={restaurant.foods}
            data={[
              "Pizza",
              "Burger",
              "Pasta",
              "Salads",
              "Noodles",
              "Curries",
              "Stir-fry",
              "Coffee",
              "Sandwiches",
              "Pastries",
            ]}
          />

          <Checkbox
            label="Today"
            checked={restaurant.date.today}
            onChange={(event) =>
              setRestaurant({
                ...restaurant,
                date: { ...restaurant.date, today: event.target.checked },
              })
            }
          />

          <Checkbox
            label="Tomorrow"
            checked={restaurant.date.tomorrow}
            onChange={(event) =>
              setRestaurant({
                ...restaurant,
                date: { ...restaurant.date, tomorrow: event.target.checked },
              })
            }
          />
          <Group justify="flex-end">
            <Button type="submit">Save changes</Button>
          </Group>
        </Flex>
      </form>
    </Flex>
  );
};

export default SignupRestaurant;
