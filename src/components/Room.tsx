import { Box, Grid, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { useColorModeValue } from "./ui/color-mode";

export default function Room() {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack alignItems={"flex-start"} gap={0}>
      <Box position={"relative"} overflow={"hidden"} rounded={"3xl"} mb={2}>
        <Image
          minH={200}
          src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTExODcyMTY5MjgxODkyMTM2MA%3D%3D/original/8d19d46c-b154-4172-b0b6-085d0255c1f3.jpeg?im_w=1200"
        />
        <Box
          cursor={"pointer"}
          position={"absolute"}
          top={3}
          right={3}
          color={"white"}
        >
          <FaRegHeart size={"20px"} />
        </Box>
      </Box>
      <Grid gap={1} templateColumns={"1fr 40px"}>
        <Text
          display={"block"}
          as={"b"}
          lineClamp={1}
          fontSize={"sm"}
          alignContent={"center"}
        >
          "월정야小"/제주돌집/제주스러운 풍경의 조용한 시골마을/2인
        </Text>
        <HStack gap={1}>
          <FaStar size={"15px"} />
          <Text>5.0</Text>
        </HStack>
      </Grid>
      <Text fontSize={"xs"} color={gray}>
        Seoul, S. Korea
      </Text>
      <Text fontSize={"xs"} color={gray}>
        <Text as={"b"}>$72</Text> / night
      </Text>
    </VStack>
  );
}
