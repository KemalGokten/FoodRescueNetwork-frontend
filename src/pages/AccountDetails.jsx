import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Button, Group, PasswordInput, TextInput, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

const AccountDetails = () => {
  const { user, setUser } = useContext(AuthContext);
  const [tempUser, setTempUser] = useState(user);

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tempUser),
        }
      );
      if (response.ok) {
        setUser(tempUser);
        notifications.show({
          title: "Change your personal informations",
          message: "Hey there, you succesfuly changed yıur personal informations",
        });
      }
    } catch (error) {
      console.log(" Error by updating the user ", error);
    }
  };

  return (
    <Flex direction="column" justify="center" align="center">
      <form onSubmit={(e) => updateUser(e)}>
        <Flex direction={"column"} gap={16} w={350}>
          <TextInput
            label="Your name"
            placeholder="Your name"
            mt={32}
            value={tempUser.fullName}
            onChange={(event) =>
              setTempUser({ ...tempUser, fullName: event.target.value })
            }
            required
          />
          <TextInput
            label="Email"
            placeholder="Email"
            required
            onChange={(event) =>
              setTempUser({ ...tempUser, email: event.target.value })
            }
            value={tempUser.email}
          />
          <TextInput
            label="User name"
            placeholder="User name"
            value={tempUser.userName}
            disabled
          />
          <PasswordInput
            label="Your password"
            placeholder="Password"
            required
            onChange={(event) =>
              setTempUser({ ...tempUser, password: event.target.value })
            }
            value={tempUser.password}
          />
          <Group justify="flex-end">
            <Button type="submit">Save changes</Button>
          </Group>
        </Flex>
      </form>
    </Flex>
  );
};

export default AccountDetails;
