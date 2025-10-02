import { Box, Text, Button, VStack } from "@chakra-ui/react";
import { FaComment, FaGithub } from "react-icons/fa";

export default function SocialLogin() {
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
        <Button variant={"outline"} w={"100%"} borderColor={"blackAlpha.600"}>
          <FaGithub /> Continue with Github
        </Button>
        <Button variant={"outline"} w={"100%"} borderColor={"blackAlpha.600"}>
          <FaComment /> Continue with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
