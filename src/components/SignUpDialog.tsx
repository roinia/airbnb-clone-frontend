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
import { FaEnvelope, FaLock, FaUser, FaUserNinja } from "react-icons/fa";
import { PasswordInput } from "./ui/password-input";

export default function SignUpDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button size={"xs"} colorPalette={"red"}>
          Sign up
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Sign up</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack>
                <InputGroup startElement={<FaUserNinja color={"gray"} />}>
                  <Input placeholder="User Name" />
                </InputGroup>
                <InputGroup startElement={<FaLock color={"gray"} />}>
                  <PasswordInput placeholder="Password" />
                </InputGroup>
                <InputGroup startElement={<FaUser color={"gray"} />}>
                  <Input placeholder="Name" />
                </InputGroup>
                <InputGroup startElement={<FaEnvelope color={"gray"} />}>
                  <Input placeholder="Email" />
                </InputGroup>
                <Button colorPalette={"red"} w={"100%"} marginTop={"2rem"}>
                  Sign up
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
