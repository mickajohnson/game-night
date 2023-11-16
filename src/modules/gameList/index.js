import { useUsername } from "@/contexts/usernameContext";
import styles from "@/styles/Home.module.css";
import convert from "xml-js";
import { useQuery } from "react-query";
import axios from "axios";
import {
  Button,
  Flex,
  Grid,
  Heading,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";

const getUsersGames = async (username) => {
  const { data } = await axios.get(
    `https://api.geekdo.com/xmlapi2/collection?username=${username}&versions=1`
  );
  const bggResponse = convert.xml2js(data, { compact: true });

  console.log(bggResponse.items.item);

  return bggResponse.items.item.filter(
    (game) => game.status._attributes.own === "1"
  );
};

export default function GameList({}) {
  const { username, setUsername } = useUsername();

  const handleLogout = () => {
    setUsername(null);
  };

  const { data: games } = useQuery({
    queryKey: ["usersGames", username],
    queryFn: () => getUsersGames(username),
    placeholderData: [],
  });

  return (
    <Box as="main" backgroundColor="#2b2b2b" color="#FFF">
      <Button onClick={handleLogout}>Logout</Button>
      <Heading textAlign="center">{username}'s Games</Heading>
      <Grid padding={6} gridGap={2} templateColumns="1fr 1fr 1fr">
        {games &&
          games.map((game) => (
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              key={game._attributes.objectid}
              borderRadius="3px"
              borderColor="#AAA"
              borderWidth="1px"
              padding={4}
            >
              <Image width="80%" src={game.image._text} alt={game.name._text} />
              <Text>{game.name._text}</Text>
            </Flex>
          ))}
      </Grid>
    </Box>
  );
}
