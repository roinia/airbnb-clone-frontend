import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton h={200} rounded={"3xl"} mb={2.5} />
      <SkeletonText noOfLines={1} mb={1} h={"18px"} />
      <SkeletonText noOfLines={1} mb={1} h={"15px"} />
      <SkeletonText noOfLines={1} h={"13px"} w={"50%"} />
    </Box>
  );
}
