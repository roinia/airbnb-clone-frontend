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
import { FaEnvelope, FaLock, FaUser, FaUserNinja } from "react-icons/fa";
import { PasswordInput } from "./ui/password-input";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUsernameLoginError, signUp } from "../api";
import { toaster } from "./ui/toaster";
import { AxiosError } from "axios";

interface IForm {
  username: string;
  name: string;
  password: string;
  email: string;
}

export default function SignUpDialog() {
  const { register, handleSubmit, reset, formState } = useForm<IForm>();
  const queryClient = useQueryClient();
  const mutation = useMutation<any, AxiosError, any>({
    mutationFn: signUp,
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("mutation is successful");
      console.log("signup is successful");
      queryClient.refetchQueries({ queryKey: ["me"] });
      toaster.create({
        description: "Welcome!!",
        type: "success",
      });
    },
    onError: (error) => {
      console.log("mutation has an error");
      const err = error.response?.data as IUsernameLoginError;
      error.message = err.error;
      reset();
    },
  });
  const onSubmit = ({ username, name, password, email }: IForm) => {
    mutation.mutate({ username, name, password, email });
  };

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
            <Dialog.Body as={"form"} onSubmit={handleSubmit(onSubmit)}>
              <VStack>
                <InputGroup startElement={<FaUserNinja color={"gray"} />}>
                  <Input
                    {...register("username", {
                      required: "Please input a username",
                      maxLength: 150,
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
                <InputGroup startElement={<FaUser color={"gray"} />}>
                  <Input
                    {...register("name", {
                      required: "Please input a name",
                      maxLength: 150,
                    })}
                    placeholder="Name"
                    required
                  />
                </InputGroup>
                <InputGroup startElement={<FaEnvelope color={"gray"} />}>
                  <Input
                    {...register("email", {
                      required: "Please input a email",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address",
                      },
                    })}
                    placeholder="Email"
                    required
                  />
                </InputGroup>

                {mutation.isError && (
                  <Text
                    alignContent={"center"}
                    color={"red.500"}
                    fontSize={"sm"}
                  >
                    {mutation.error.message}
                  </Text>
                )}

                {formState.errors.email?.message && (
                  <Text
                    alignContent={"center"}
                    color={"red.500"}
                    fontSize={"sm"}
                  >
                    {formState.errors.email?.message}
                  </Text>
                )}

                <Button
                  type="submit"
                  colorPalette={"red"}
                  w={"100%"}
                  marginTop={"2rem"}
                  loading={mutation.isPending}
                >
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
