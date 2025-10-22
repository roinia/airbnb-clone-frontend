import {
  Button,
  CloseButton,
  Dialog,
  Input,
  InputGroup,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { FaLock, FaUserNinja } from "react-icons/fa";
import { PasswordInput } from "./ui/password-input";
import { useForm } from "react-hook-form";
import {
  IUsernameLoginError,
  IUsernameLoginSuccess,
  IUsernameLoginVariables,
  usernameLogIn,
} from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toaster } from "./ui/toaster";

interface IForm {
  username: string;
  password: string;
}

export default function LoginDialog() {
  const { register, handleSubmit, reset } = useForm<IForm>();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    IUsernameLoginSuccess,
    IUsernameLoginError,
    IUsernameLoginVariables
  >({
    mutationFn: usernameLogIn,
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("mutation is successful");
      if (data.ok) {
        console.log("login success");
        queryClient.refetchQueries({ queryKey: ["me"] });
        toaster.create({
          description: "Welcome back!!",
          type: "success",
        });
      } else {
        console.log("login failed");
        console.log(data);
      }
    },
    onError: (error) => {
      console.log("mutation has an error");
      reset();
    },
  });
  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };

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
            <Dialog.Body as={"form"} onSubmit={handleSubmit(onSubmit)}>
              <VStack>
                <InputGroup startElement={<FaUserNinja color={"gray"} />}>
                  <Input
                    {...register("username", {
                      required: "Please input a username",
                    })}
                    placeholder="User Name"
                    required
                  />
                </InputGroup>
                <InputGroup startElement={<FaLock color={"gray"} />}>
                  <PasswordInput
                    {...register("password", {
                      required: "Please input a password",
                    })}
                    placeholder="Password"
                    required
                  />
                </InputGroup>

                {mutation.isError ? (
                  <Text
                    alignContent={"center"}
                    color={"red.500"}
                    fontSize={"sm"}
                  >
                    User name or password is wrong
                  </Text>
                ) : null}

                <Button
                  type="submit"
                  colorPalette={"red"}
                  w={"100%"}
                  marginTop={"2rem"}
                  loading={mutation.isPending}
                >
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
