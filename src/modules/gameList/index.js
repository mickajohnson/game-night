import { useState, useMemo } from "react";
import { useUsername } from "@/contexts/usernameContext";
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
  Checkbox,
  CheckboxGroup,
  Stack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { sortBy } from "lodash";

const calculateBestPlayerCounts = (poll) => {
  const bestPlayerCounts = [];

  poll.forEach((playerCount) => {
    const bestVotes = parseInt(playerCount.result[0]._attributes.numvotes);
    const recVotes = parseInt(playerCount.result[1]._attributes.numvotes);
    const notRecVotes = parseInt(playerCount.result[2]._attributes.numvotes);
    if (bestVotes > recVotes && bestVotes > notRecVotes) {
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

  const gamePromises = [ownedGames[5]].map((game) =>
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

  return games;
};

const PLAYER_COUNTS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function GameList({}) {
  const { username, setUsername } = useUsername();

  const handleLogout = () => {
    setUsername(null);
  };

  const [playerCounts, setPlayerCounts] = useState([]);

  const { data } = useQuery({
    queryKey: ["usersGames", username],
    queryFn: () => getUsersGames(username),
    placeholderData: [],
    staleTime: Infinity,
  });

  const games = data || [];

  const filteredGames = useMemo(() => {
    const sortedPlayerCounts = sortBy(playerCounts);
    const lowestAcceptable = parseInt(sortedPlayerCounts[0]);
    const highestAcceptable = parseInt(
      sortedPlayerCounts[sortedPlayerCounts.length - 1]
    );

    return games.filter((game) => {
      if (lowestAcceptable || highestAcceptable) {
        return (
          lowestAcceptable >= game.minPlayers &&
          highestAcceptable <= game.maxPlayers
        );
      }
      return true;
    });
  }, [playerCounts, games]);

  return (
    <Box padding={6} as="main" backgroundColor="#2b2b2b" color="#FFF">
      <Button onClick={handleLogout}>Logout</Button>
      <Heading marginBottom={4} textAlign="center">
        {username}'s Games
      </Heading>
      <Flex
        direction="column"
        borderRadius="3px"
        borderColor="#AAA"
        borderWidth="1px"
        justifyContent="center"
        alignItems="center"
        padding={4}
        marginBottom={4}
      >
        <Heading lineHeight="1" textAlign="center" as="h3">
          Filters
        </Heading>
        <FormControl as="fieldset">
          <FormLabel as="legend">Player Count</FormLabel>
          <CheckboxGroup
            onChange={(values) => setPlayerCounts(values)}
            colorScheme="green"
            value={playerCounts}
          >
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              {PLAYER_COUNTS.map((count, index) => (
                <Checkbox key={`playerCount${count}`} value={count}>
                  {count}
                  {index === PLAYER_COUNTS.length - 1 ? "+" : ""}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>
      </Flex>
      <Grid gridGap={2} templateColumns="1fr 1fr 1fr">
        {filteredGames.map((game) => (
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
