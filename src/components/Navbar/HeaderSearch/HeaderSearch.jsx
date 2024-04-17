import { Link } from "react-router-dom";
import { Autocomplete, Group, Burger, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import classes from "./HeaderSearch.module.css";
import Logo from "../../ui/logo.jsx";

import AccountMenu from "./AccountMenu.jsx";

import { Avatar } from "@mantine/core";
import { GrFavorite } from "react-icons/gr";
import { IoIosBasket } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const links = [
  { icon: IoHomeOutline, link: "/" },
  { icon: GrFavorite, link: "/wishlist" },
  { icon: AccountMenu, link: "/myaccount" }, // Use AccountMenu component directly
  { icon: IoIosBasket, link: "/cart" },
];
export function HeaderSearch({ setSearchBar }) {
  const [searchBar, setSearchBarLocal] = useState("");
  const [opened, { toggle }] = useDisclosure(false);

  const navigate = useNavigate();

  const items = links.map((link, index) => {
    return link.icon.name === "AccountMenu" ? (
      <div key={index} className={classes.link}>
        <link.icon />
      </div>
    ) : (
      <Link key={index} to={link.link} className={classes.link}>
        <Avatar color="blue" radius="sm">
          <link.icon size="1.5rem" />
        </Avatar>
      </Link>
    );
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setSearchBar(searchBar);
      navigate("/restaurants");
    }
  };

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group justify="space-between">
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            // TODO: gather food names from backend data
            data={[
              "Pizza",
              "Burger",
              "Noodles",
              "Salads",
              "Pasta",
              "Curries",
              "Stir-fry",
              "Coffee",
              "Sandwiches",
              "Pastries",
            ]}
            value={searchBar}
            onChange={setSearchBarLocal}
            onKeyDown={handleKeyDown}
            visibleFrom="xs"
          />
        </Group>

        <Logo />

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
        </Group>
      </div>
    </header>
  );
}
