import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "@/types";
import {
  Avatar,
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>({
    queryKey: ["rooms", roomPk],
    queryFn: getRoom,
  });
  const { isLoading: isReviewsLoading, data: reviewsData } = useQuery<
    IReview[]
  >({
    queryKey: ["rooms", roomPk, "reviews"],
    queryFn: getRoomReviews,
  });
  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 20,
      }}
    >
      <Skeleton loading={isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={4}
        gap={2}
        height="60vh"
        rounded={"3xl"}
        overflow={"hidden"}
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4, 1fr)"}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            key={index}
            overflow={"hidden"}
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
          >
            <Skeleton loading={isLoading} w={"100%"} h={"100%"}>
              <Image
                w={"100%"}
                h={"100%"}
                objectFit={"cover"}
                src={data?.photos[index] ? data?.photos[index].file : undefined}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack mt={10} w={"40%"} justifyContent={"space-between"}>
        <VStack alignItems={"flex-start"}>
          <Skeleton loading={isLoading}>
            <Heading fontSize={"large"}>
              House hosted by {data?.owner.name}
            </Heading>
          </Skeleton>
          <Skeleton loading={isLoading}>
            <HStack w={"100%"} justifyContent={"flex-start"}>
              <Text>
                {data?.rooms} room
                {data?.rooms === undefined ? "" : data?.rooms > 1 ? "s" : ""}
              </Text>
              <Text>ㆍ</Text>
              <Text>
                {data?.toilets} toilet
                {data?.toilets === undefined
                  ? ""
                  : data?.toilets > 1
                  ? "s"
                  : ""}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar.Root size={"xl"}>
          <Avatar.Fallback name={data?.owner.name} />
          <Avatar.Image src={data?.owner.avatar} />
        </Avatar.Root>
      </HStack>
      <Box mt={10}>
        <Skeleton loading={isLoading}>
          <Heading mb={5} fontSize={"large"}>
            <HStack>
              <FaStar />
              <Text>{data?.rating}</Text>
              <Text>ㆍ</Text>
              <Text>
                {reviewsData?.length} review
                {reviewsData?.length === undefined
                  ? ""
                  : reviewsData?.length > 1
                  ? "s"
                  : ""}
              </Text>
            </HStack>
          </Heading>
        </Skeleton>
        <Grid templateColumns={"1fr 1fr"} gap={6} w={"50%"}>
          {reviewsData?.map((review, index) => (
            <VStack key={index} alignItems={"flex-start"}>
              <HStack>
                <Avatar.Root size={"md"}>
                  <Avatar.Fallback name={review.user.name} />
                  <Avatar.Image src={review.user.avatar} />
                </Avatar.Root>
                <VStack alignItems={"flex-start"} gap={0}>
                  <Heading fontSize={"md"}>{review.user.name}</Heading>
                  <HStack gap={1}>
                    <FaStar size={"12px"} />
                    <Text>{review.rating}</Text>
                  </HStack>
                </VStack>
              </HStack>
              <Text>{review.payload}</Text>
            </VStack>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
