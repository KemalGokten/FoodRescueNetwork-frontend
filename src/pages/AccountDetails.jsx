import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import {
  Button,
  Group,
  PasswordInput,
  TextInput,
  Flex,
  Tabs,
  rem,
  Avatar,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import {
  IconMessageCircle,
  IconPhoto,
  IconSettings,
} from "@tabler/icons-react";

import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const AccountDetails = () => {
  const { user, updateUserData, logout } = useContext(AuthContext);
  const [tempUser, setTempUser] = useState(user);
  const [isEdit, setIsEdit] = useState(true);
  const [visible, { toggle }] = useDisclosure(false);
  const iconStyle = { width: rem(12), height: rem(12) };
  const [activeTab, setActiveTab] = useState("personal-details");

  const navigate = useNavigate();

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
        updateUserData(tempUser);
        setIsEdit(true);
        toggle();
        notifications.show({
          title: "Change your personal informations",
          message:
            "Hey there, you succesfuly changed your personal informations",
        });
      }
    } catch (error) {
      console.log(" Error by updating the user ", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${user.id}`,
        {
          method: `DELETE`,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        console.log("User Deleted from db");
      }
    } catch (error) {
      console.log(error, " on deleting user from db");
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/userOrders?userId=${user.id}`
      );

      if (response.ok) {
        const responseData = await response.json();
        const dataId = responseData[0].id;

        const responseById = await fetch(
          `${import.meta.env.VITE_API_URL}/userOrders/${dataId}`,
          {
            method: `DELETE`,
            headers: { "Content-Type": "application/json" },
          }
        );
        if (responseById.ok) {
          console.log("User Orders Deleted from db");
        }
      }
    } catch (error) {
      console.log(error, " on deleting userOrders from db");
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/userFavorites?userId=${user.id}`
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData[0]);
        const dataId = responseData[0].id;

        const responseById = await fetch(
          `${import.meta.env.VITE_API_URL}/userFavorites/${dataId}`,
          {
            method: `DELETE`,
            headers: { "Content-Type": "application/json" },
          }
        );
        if (responseById.ok) {
          console.log("User Favorites Deleted from db");
        }
      }
    } catch (error) {
      console.log(error, " on deleting userOrders from db");
    }

    logout();
    navigate("/");
  };

  const handleCancel = () => {
    setIsEdit(true)
    setTempUser(user);
  }

  return (
    <Flex justify={"flex-start"} mt={32}>
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        orientation="vertical"
        defaultValue="gallery"
      >
        <Tabs.List>
          <Tabs.Tab
            value="personal-details"
            leftSection={<IconPhoto style={iconStyle} />}
          >
            Personal Details
          </Tabs.Tab>
          <Tabs.Tab
            value="delete-account"
            leftSection={<IconMessageCircle style={iconStyle} />}
          >
            Delete Account
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {activeTab === "personal-details" && (
        <Flex direction="column" justify="center" align="center" ml={550}>
          <form onSubmit={(e) => updateUser(e)}>
            <Flex direction={"column"} gap={16} w={500}>
              <TextInput
                label="Your name"
                placeholder="Your name"
                value={tempUser.fullName}
                onChange={(event) =>
                  setTempUser({ ...tempUser, fullName: event.target.value })
                }
                required
                disabled={isEdit}
              />
              <TextInput
                label="Email"
                placeholder="Email"
                required
                onChange={(event) =>
                  setTempUser({ ...tempUser, email: event.target.value })
                }
                value={tempUser.email}
                disabled={isEdit}
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
                disabled={isEdit}
                visible={visible}
                onVisibilityChange={toggle}
              />
              <Group justify={isEdit ? "center" : "space-between"}>
                {isEdit && (
                  <Button type="button" onClick={() => setIsEdit(false)}>
                    Edit
                  </Button>
                )}
                {isEdit || (
                  <>
                    <Button type="submit">Save changes</Button>
                    <Button type="button" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </>
                )}
              </Group>
            </Flex>
          </form>
        </Flex>
      )}

      {activeTab === "delete-account" && (
        <Flex direction="column" justify="center" align="center" ml={650}>
          <Flex direction={"column"} gap={16} w={500}>
            <Avatar variant="transparent" size="10rem">
              <RiDeleteBin6Line />
            </Avatar>

            <h1>
              In order to delete your account, we’ll need to verify the
              following:{" "}
            </h1>
            <p>
              All payments and refunds are settled. All gift card balances or
              credits have been used completely. All orders have been delivered
              successfully. Make sure you save important order details (such as
              warranty information) before deleting your account. You can always
              contact us for help in the future, but we won’t have access to
              this information and will need you to provide it. Any previous
              communication with Customer Care will also be deleted. If you have
              a Zalando Lounge and/or Zalon account, it will be closed too.
              Deleting your account because you can’t reset your email address
              or have another issue? Try visiting our Help & FAQ section first.
            </p>

            <Group ml={15}>
              <Button type="button" color="red" onClick={handleDeleteUser}>
                Delete Account
              </Button>
            </Group>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default AccountDetails;
