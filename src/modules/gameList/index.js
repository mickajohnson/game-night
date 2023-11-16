import { useUsername } from "@/contexts/usernameContext";
import styles from "@/styles/Home.module.css";
import convert from "xml-js";
import { useQuery } from "@tanstack/react-query";
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

const calculateBestPlayerCounts = (poll) => {
  const bestPlayerCounts = [];

  poll.forEach((playerCount) => {
    const bestVotes = parseInt(playerCount.result[0]._attributes.numvotes);
    const recVotes = parseInt(playerCount.result[1]._attributes.numvotes);
    const notRecVotes = parseInt(playerCount.result[2]._attributes.numvotes);
    if (bestVotes > recVotes && bestVotes > notRecVotes) {
      console.log(playerCount);
      bestPlayerCounts.push(parseInt(playerCount._attributes.numplayers));
    }
  });

  return bestPlayerCounts;
};

const transformGame = (game) => {
  const primaryName =
    game.name.find((name) => name._attributes.type === "primary") ||
    game.name[0];

  const bestPlayerCountPoll =
    game.poll.find(
      (poll) => poll._attributes.name === "suggested_numplayers"
    ) || game.poll[0];

  return {
    id: game._attributes.id,
    title: primaryName._attributes.value,
    image: game.image._text,
    maxPlayers: parseInt(game.maxplayers._attributes.value),
    minPlayers: parseInt(game.minplayers._attributes.value),
    bestPlayerCounts: calculateBestPlayerCounts(bestPlayerCountPoll.results),
  };
};

const getUsersGames = async (username) => {
  const { data } = await axios.get(
    `https://api.geekdo.com/xmlapi2/collection?username=${username}&versions=1`
  );
  const bggResponse = convert.xml2js(data, { compact: true });

  const ownedGames = bggResponse.items.item.filter(
    (game) => game.status._attributes.own === "1"
  );

  const gamePromises = [ownedGames[0]].map((game) =>
    axios.get(
      `https://api.geekdo.com/xmlapi2/thing?id=${game._attributes.objectid}&versions=1&stats=1`
    )
  );

  const results = await Promise.all(gamePromises);

  const games = results.map(({ data }) => {
    const convertedGame = convert.xml2js(data, { compact: true });
    console.log(convertedGame.items.item);
    return transformGame(convertedGame.items.item);
  });

  console.log(games);

  return games;
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
    staleTime: Infinity,
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
              key={game.id}
              borderRadius="3px"
              borderColor="#AAA"
              borderWidth="1px"
              padding={4}
            >
              <Image width="80%" src={game.image} alt={game.title} />
              <Text>{game.title}</Text>
              <Text>
                {game.minPlayers} - {game.maxPlayers} Players
              </Text>
            </Flex>
          ))}
      </Grid>
    </Box>
  );
}
