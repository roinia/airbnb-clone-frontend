import { Avatar, Box, HStack, Menu, Portal } from "@chakra-ui/react";
import { FaAirbnb } from "react-icons/fa";
import LoginDialog from "./LoginDialog";
import SignUpDialog from "./SignUpDialog";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";
import { Toaster, toaster } from "./ui/toaster";
import { Link } from "react-router-dom";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const queryClient = useQueryClient();
  const logoColor = useColorModeValue("red.500", "red.200");
  const toastId = useRef("");

  const mutation = useMutation({
    mutationFn: logOut,
    onMutate: () => {
      toastId.current = toaster.create({
        title: "Logout ...",
        description: "Sad to see you go...",
        type: "loading",
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["me"] });
      toaster.update(toastId.current, {
        title: "Done!",
        description: "Logout successfully",
        type: "success",
      });
    },
  });

  const onLogOut = async () => {
    mutation.mutate();
  };
  return (
    <>
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
          <Link to={"/"}>
            <FaAirbnb size={"36px"} />
          </Link>
        </Box>
        <HStack>
          <ColorModeButton />
          {!userLoading ? (
            !isLoggedIn ? (
              <>
                <LoginDialog />
                <SignUpDialog />
              </>
            ) : (
              <Menu.Root positioning={{ placement: "bottom" }}>
                <Menu.Trigger rounded="full" focusRing="outside">
                  <Avatar.Root>
                    <Avatar.Fallback name={user?.name} />
                    <Avatar.Image src={user?.avatar} />
                  </Avatar.Root>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item value="logout" onClick={onLogOut}>
                        Logout
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            )
          ) : null}
        </HStack>
      </HStack>
      <Toaster />
    </>
  );
}
