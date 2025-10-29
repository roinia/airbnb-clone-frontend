import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { useColorModeValue } from "./ui/color-mode";
import { Link, useNavigate } from "react-router-dom";

interface IRoomProps {
  pk: number;
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  isOwner: boolean;
}

export default function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
  isOwner,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  const navigate = useNavigate();
  const onCamaraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={"flex-start"} gap={0}>
        <Box
          position={"relative"}
          overflow={"hidden"}
          rounded={"3xl"}
          mb={2}
          h={"25vh"}
          w={"100%"}
        >
          {imageUrl ? (
            <Image minH={200} src={imageUrl} />
          ) : (
            <Box bg={"gray.400"} minH={200} w={"100%"} h={"100%"} />
          )}
          <Button
            position={"absolute"}
            top={0}
            right={0}
            p={0}
            variant={"plain"}
            color={"white"}
            onClick={onCamaraClick}
          >
            {isOwner ? (
              <FaCamera size={"20px"} />
            ) : (
              <FaRegHeart size={"20px"} />
            )}
          </Button>
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
