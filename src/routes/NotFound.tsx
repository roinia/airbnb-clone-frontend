import { Button, Heading, Link, Text, VStack } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <VStack bg="gray.100" minH={"100vh"} justifyContent={"center"}>
      <Heading>Page not found</Heading>
      <Text>It seems that you're lost</Text>
      <Link href="/">
        <Button>Go home</Button>
      </Link>
    </VStack>
  );
}
