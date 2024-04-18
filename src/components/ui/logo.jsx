import { Group, Text } from "@mantine/core";
import { IoFastFood } from "react-icons/io5";

const Logo = ({ size = "32px" }) => {
  return (
    <Group py={16}>
      <IoFastFood size={32} fill="green" />
      <Text fw={700} c={"green"} size={size}>
        Foodindream
      </Text>
    </Group>
  );
};

export default Logo;
