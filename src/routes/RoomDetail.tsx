import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { checkBooking, getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "@/types";
import {
  Avatar,
  Box,
  Button,
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
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { Value } from "react-calendar/dist/shared/types.js";
import { Helmet } from "react-helmet";

export default function RoomDetail() {
  const { roomPk } = useParams();

  const { isLoading, data } = useQuery<IRoomDetail>({
    queryKey: ["rooms", roomPk],
    queryFn: getRoom,
  });

  const { data: reviewsData } = useQuery<IReview[]>({
    queryKey: ["rooms", roomPk, "reviews"],
    queryFn: getRoomReviews,
  });

  const [dates, setDates] = useState<Value>();

  const { isLoading: isBookingCheckLoading, data: bookingAvailable } = useQuery(
    {
      queryKey: ["checkBooking", roomPk, dates],
      queryFn: checkBooking,
      enabled: dates !== undefined,
      gcTime: 0,
    }
  );

  const navigate = useNavigate();
  const onEditClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${roomPk}/edit`);
  };

  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 20,
      }}
    >
      <Helmet>
        <title>{data ? data.name : "Loading..."}</title>
      </Helmet>
      <HStack justifyContent={"space-between"}>
        <Skeleton loading={isLoading}>
          <Heading>{data?.name}</Heading>
        </Skeleton>
        {data?.is_owner ? (
          <Button size={"xs"} loading={isLoading} onClick={onEditClick}>
            Edit
          </Button>
        ) : null}
      </HStack>
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
      <Grid gap={20} templateColumns={"2fr 1fr"} maxW={"100%"}>
        <Box>
          <HStack mt={10} justifyContent={"space-between"}>
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
                    {data?.rooms === undefined
                      ? ""
                      : data?.rooms > 1
                      ? "s"
                      : ""}
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
            <Grid templateColumns={"1fr 1fr"} gap={6}>
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
        <Box pt={10}>
          <Calendar
            minDetail="month"
            prev2Label={null}
            next2Label={null}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
            selectRange
            formatDay={(locale, date) => date.getDate().toString()}
            onChange={setDates}
          />
          <Button
            loading={isBookingCheckLoading}
            disabled={!bookingAvailable}
            w="100%"
            my={5}
            colorPalette={"red"}
          >
            Make booking
          </Button>
          {!isBookingCheckLoading && !bookingAvailable ? (
            <Text color={"red.500"}>Can't book on those dates, sorry.</Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
}
