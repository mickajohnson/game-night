import { Box, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home() {
  const username = useSelector((state) => state.user.username);

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
