import { Link } from "react-router-dom";
import { Autocomplete, Group, Burger, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "./HeaderSearch.module.css";

import { Avatar } from "@mantine/core";
import { RiUser3Line } from "react-icons/ri";
import { GrFavorite } from "react-icons/gr";
import { IoIosBasket } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";


const links = [
  {icon: IoHomeOutline, link: "/" },
  { icon: GrFavorite, link: "/wishlist" },
  { icon: RiUser3Line, link: "/myaccount" },
  { icon: IoIosBasket, link: "/cart" },
  
];

export function HeaderSearch() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link, index) => (
    <Link key={index} to={link.link} className={classes.link}>
      <Avatar color="blue" radius="sm">
        <link.icon size="1.5rem" />
      </Avatar>
    </Link>
  ));

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
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
            visibleFrom="xs"
          />
        </Group>

        <Group>
          <MantineLogo size={28} />
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
        </Group>
      </div>
    </header>
  );
}
