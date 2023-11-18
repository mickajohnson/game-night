import { useUsername } from "@/contexts/usernameContext";
import { Box, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  const { username } = useUsername();

  return (
    <Box>
      <Heading fontWeight="400" color="#AAA">
        Welcome to Game Night Picker
      </Heading>
      <Link href={username ? "/games" : "/username"} passHref legacyBehavior>
        <Button as="a">Start</Button>
      </Link>
    </Box>
  );
}
