import { Box, Grid, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { useColorModeValue } from "./ui/color-mode";
import { Link } from "react-router-dom";

interface IRoomProps {
  pk: number;
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
}

export default function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={"flex-start"} gap={0}>
        <Box
          position={"relative"}
          overflow={"hidden"}
          rounded={"3xl"}
          mb={2}
          h={"25vh"}
        >
          <Image minH={200} src={imageUrl} />
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
            {name}
          </Text>
          <HStack gap={1}>
            <FaStar size={"15px"} />
            <Text>{rating}</Text>
          </HStack>
        </Grid>
        <Text fontSize={"xs"} color={gray}>
          {city}, {country}
        </Text>
        <Text fontSize={"xs"} color={gray}>
          <Text as={"b"}>${price}</Text> / night
        </Text>
      </VStack>
    </Link>
  );
}
