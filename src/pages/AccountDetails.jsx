import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const AccountDetails = () => {
  const { user, setUser } = useContext(AuthContext);
  const [tempUser, setTempUser] = useState(user);



  const updateUser = async (e) => {
    e.preventDefault();
    console.log("Submit worked");

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
        console.log("User successfully updated")
      }
    } catch (error) {
      console.log(" Error by updating the user " , error);
    }
  };

  return (
    <>
      <form onSubmit={(e) => updateUser(e)}>
        <TextInput
          label="Your name"
          placeholder="Your name"
          value={tempUser.fullName}
          onChange={(event) =>
            setTempUser({ ...tempUser, fullName: event.target.value })
          }
          required
        />
        <TextInput
          label="Email"
          placeholder="Email"
          mt="md"
          required
          onChange={(event) =>
            setTempUser({ ...tempUser, email: event.target.value })
          }
          value={tempUser.email}
        />
        <TextInput
          label="User name"
          placeholder="User name"
          mt="md"
          value={tempUser.userName}
          disabled
        />
        <PasswordInput
          label="Your password"
          mt="md"
          placeholder="Password"
          required
          onChange={(event) =>
            setTempUser({ ...tempUser, password: event.target.value })
          }
          value={tempUser.password}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Save changes</Button>
        </Group>
      </form>
    </>
  );
};

export default AccountDetails;
