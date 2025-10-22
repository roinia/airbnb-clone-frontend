import { Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toaster } from "../components/ui/toaster";
import { kakaoLogIn } from "../api";

export default function KakaoConfirm() {
  const { search } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: kakaoLogIn,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["me"] });
      toaster.create({
        title: "Welcome",
        description: "Happy to have you back!",
        type: "success",
      });
      navigate("/");
    },
    onError: () => {
      toaster.create({
        title: "Login Failed",
        description: "Kakao Login failed",
        type: "error",
      });
      navigate("/");
    },
  });

  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      mutation.mutate(code);
    }
  };

  useEffect(() => {
    confirmLogin();
  }, []);

  return (
    <>
      <VStack justifyContent={"center"} mt={40}>
        <Heading>Processing log in...</Heading>
        <Text>Don't go anywhere.</Text>
        <Spinner size={"xl"} mt={20} />
      </VStack>
    </>
  );
}
