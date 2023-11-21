import {
  Box,
  Text,
  Button,
  Divider,
  OrderedList,
  ListItem,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <Box as="main" padding={6}>
      <Stack spacing={3}>
        <Text textAlign="center" fontSize="2xl" fontWeight="600" color="white">
          Welcome to Game Night
        </Text>
        <Text color="white">
          Every have trouble deciding on the ideal game to make your game night
          everything it ought to be?
        </Text>
        <Text color="white">With Game Night, your troubles are over!</Text>
        <Text color="white">
          Give us your criteria, and we'll let you know not only what games your
          group could play, but what games they should play.
        </Text>

        <Divider />
        <OrderedList spacing={3}>
          <ListItem color="white">
            {
              "First, sign in with your BoardGameGeek username. (Make sure your collection is up to date.)"
            }
          </ListItem>
          <ListItem color="white">
            Then, use our filters to narrow down your collection to the best
            choice
          </ListItem>
          <ListItem color="white">Have a great time</ListItem>
        </OrderedList>
        <Link href={username ? "/games" : "/username"} passHref legacyBehavior>
          <Button as="a">Get Started</Button>
        </Link>
      </Stack>
    </Box>
  );
}
