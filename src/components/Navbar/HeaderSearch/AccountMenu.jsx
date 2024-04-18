import cx from "clsx";
import { useContext, useState } from "react";
import { Avatar, UnstyledButton, Menu, rem } from "@mantine/core";
import {
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import classes from "./AccountMenu.module.css";
import { RiUser3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

export default function AccountMenu() {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const handleClickDetails = () => {
    navigate("/account_details");
  };

  const handleClickOrders = () => {
    navigate("/previous_orders");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleClickSignupRestaurant = () =>{
    navigate("/signup_restaurant");
  }

  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
      trigger="hover"
      openDelay={100}
      closeDelay={100}
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Avatar color="green" radius="sm" size={40}>
            <RiUser3Line color="orange" size="1.5rem" />
          </Avatar>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconSettings
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          onClick={handleClickDetails}
        >
          Account settings
        </Menu.Item>

        {user.accountType === "user" ? (
          <Menu.Item
            leftSection={
              <IconSwitchHorizontal
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            onClick={handleClickOrders}
          >
            Orders
          </Menu.Item>
        ) : (
          <Menu.Item
            leftSection={
              <IconSwitchHorizontal
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            onClick={handleClickSignupRestaurant}
          >
            Signup your restaurant
          </Menu.Item>
        )}

        <Menu.Divider />
        <Menu.Item
          leftSection={
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
