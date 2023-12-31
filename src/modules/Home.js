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
        <Text textAlign="center" fontSize="2xl" fontWeight="600">
          Welcome to Plays Best
        </Text>
        <Text>
          Every have trouble deciding on the ideal game to make your game night
          everything it ought to be?
        </Text>
        <Text>With Plays Best, your troubles are over!</Text>
        <Text>Enter your criteria, and we'll let you know what plays best</Text>

        <Divider borderColor="black" />
        <OrderedList spacing={3}>
          <ListItem>
            {
              "First, sign in with your BoardGameGeek username. (Make sure your collection is up to date.)"
            }
          </ListItem>
          <ListItem>
            Then, use our filters to narrow down your collection to the best
            choice
          </ListItem>
          <ListItem>Have a great time</ListItem>
        </OrderedList>
        <Link href={username ? "/games" : "/username"} passHref legacyBehavior>
          <Button
            color="white"
            backgroundColor="brand.sea.400"
            _hover={{ backgroundColor: "brand.sea.500" }}
            _active={{ backgroundColor: "brand.sea.600" }}
            as="a"
            width="100%"
            maxWidth={64}
            margin="auto"
          >
            Get Started
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
