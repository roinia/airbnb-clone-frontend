import {
  Button,
  CloseButton,
  Dialog,
  Input,
  InputGroup,
  Portal,
  VStack,
} from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { FaLock, FaUserNinja } from "react-icons/fa";
import { PasswordInput } from "./ui/password-input";

export default function LoginDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size={"xs"}>Login</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Log in</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack>
                <InputGroup startElement={<FaUserNinja color={"gray"} />}>
                  <Input placeholder="User Name" />
                </InputGroup>
                <InputGroup startElement={<FaLock color={"gray"} />}>
                  <PasswordInput placeholder="Password" />
                </InputGroup>
                <Button colorPalette={"red"} w={"100%"} marginTop={"2rem"}>
                  Log in
                </Button>
                <SocialLogin />
              </VStack>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
