import { Box, HStack } from "@chakra-ui/react";
import { FaAirbnb } from "react-icons/fa";
import LoginDialog from "./LoginDialog";
import SignUpDialog from "./SignUpDialog";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";

export default function Header() {
  const logoColor = useColorModeValue("red.500", "red.200");
  return (
    <HStack
      justifyContent={"space-between"}
      px={{
        base: 10,
        lg: 20,
      }}
      py={5}
      borderBottomWidth={1}
    >
      <Box color={logoColor}>
        <FaAirbnb size={"36px"} />
      </Box>
      <HStack>
        <ColorModeButton />
        <LoginDialog />
        <SignUpDialog />
      </HStack>
    </HStack>
  );
}
