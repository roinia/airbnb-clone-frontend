import { Box, Text, Button, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  const githubParams = {
    client_id: "Ov23li3GBHYM7BA35j7K",
    scope: "read:user,user:email",
  };
  const githubParamsString = new URLSearchParams(githubParams).toString();

  const kakaoParams = {
    client_id: "ceff73c61cd2a9b80f85e20c6ae74c48",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  const kakaoParamsString = new URLSearchParams(kakaoParams).toString();

  return (
    <Box mb={4} w={"100%"}>
      <VStack w={"100%"}>
        <Text
          textTransform={"uppercase"}
          color={"gray.500"}
          fontSize={"xs"}
          as={"b"}
          my={4}
        >
          Or
        </Text>
        <Button
          asChild
          variant={"outline"}
          w={"100%"}
          borderColor={"blackAlpha.600"}
        >
          <a
            href={`https://github.com/login/oauth/authorize?${githubParamsString}`}
          >
            <FaGithub /> Continue with Github
          </a>
        </Button>
        <Button
          asChild
          variant={"outline"}
          w={"100%"}
          borderColor={"blackAlpha.600"}
        >
          <a
            href={`https://kauth.kakao.com/oauth/authorize?${kakaoParamsString}`}
          >
            <FaComment /> Continue with Kakao
          </a>
        </Button>
      </VStack>
    </Box>
  );
}
