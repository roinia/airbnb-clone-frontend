import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../api";
import RoomSkeleton from "../components/RoomSkeleton";
import Room from "../components/Room";
import { IRoomList } from "@/types";
import { Helmet } from "react-helmet";

export default function Home() {
  const { isLoading, data } = useQuery<IRoomList[]>({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
  return (
    <>
      <Helmet>
        <title>Airbnb Clone</title>
      </Helmet>
      <Grid
        mt={10}
        px={{
          base: 10,
          lg: 20,
        }}
        columnGap={5}
        rowGap={10}
        templateColumns={{
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(5, 1fr)",
          xl: "repeat(7, 1fr)",
        }}
      >
        {isLoading ? (
          <>
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
            <RoomSkeleton />
          </>
        ) : null}
        {data?.map((room) => (
          <Room
            key={room.pk}
            pk={room.pk}
            imageUrl={room?.photos[0]?.file}
            name={room.name}
            rating={room.rating}
            city={room.city}
            country={room.country}
            price={room.price}
            isOwner={room.is_owner}
          />
        ))}
      </Grid>
    </>
  );
}
