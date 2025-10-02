import Room from "../components/Room";
import { Box, Grid, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 20,
      }}
      columnGap={5}
      rowGap={10}
      templateColumns={{
        sm: "1fr",
        md: "repeat(3, 1fr)",
        lg: "repeat(5, 1fr)",
        xl: "repeat(7, 1fr)",
      }}
    >
      <Box>
        <Skeleton h={200} rounded={"3xl"} mb={2.5} />
        <SkeletonText noOfLines={1} mb={1} h={"18px"} />
        <SkeletonText noOfLines={1} mb={1} h={"15px"} />
        <SkeletonText noOfLines={1} h={"13px"} w={"50%"} />
      </Box>
      <Room />
    </Grid>
  );
}
