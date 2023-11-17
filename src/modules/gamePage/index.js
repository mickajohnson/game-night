import { useState, useMemo } from "react";
import { useUsername } from "@/contexts/usernameContext";
import {
  Button,
  Flex,
  Heading,
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import groupBy from "lodash.groupby";
import GameList from "@/components/GameList";
import { useGetUserGamesQuery } from "@/queries/getUserGames";

const PLAYER_COUNTS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const COMPLEXITIES = [
  { label: "Light", value: "1" },
  { label: "Medium Light", value: "2" },
  { label: "Medium", value: "3" },
  { label: "Medium Heavy", value: "4" },
  { label: "Heavy", value: "5" },
];

export default function GamesPage({}) {
  const { username, setUsername } = useUsername();

  const handleLogout = () => {
    setUsername(null);
  };

  const [playerCounts, setPlayerCounts] = useState([]);
  const [complexities, setComplexities] = useState([]);
  const [bestAtCount, setBetAtCount] = useState("");

  const { data } = useGetUserGamesQuery(username);

  const groupedGames = useMemo(() => {
    const games = data || [];

    const filteredGames = games.filter((game) => {
      let shouldNotFilter = true;
      if (shouldNotFilter && playerCounts.length > 0) {
        shouldNotFilter = playerCounts.some((count) => {
          const countInt = parseInt(count);

          return countInt >= game.minPlayers && countInt <= game.maxPlayers;
        });
      }

      const roundedWeight = Math.round(game.weight);

      if (shouldNotFilter && complexities.length > 0) {
        shouldNotFilter = complexities.includes(`${roundedWeight}`);
      }

      return shouldNotFilter;
    });

    if (!bestAtCount.length) {
      return {
        all: filteredGames,
      };
    }
    return groupBy(filteredGames, (game) => {
      const bestAtNumber = parseInt(bestAtCount);

      if (game.playerCounts.best.includes(bestAtNumber)) {
        return "best";
      } else if (game.playerCounts.recommended.includes(bestAtNumber)) {
        return "recommended";
      } else {
        return "notRecommended";
      }
    });
  }, [playerCounts, data, bestAtCount, complexities]);

  return (
    <Box padding={6} as="main" backgroundColor="#2b2b2b" color="#FFF">
      <Button onClick={handleLogout}>Logout</Button>
      <Heading marginBottom={4} textAlign="center">
        {username}&apos;s Games
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
          Filter By
        </Heading>
        <FormControl marginBottom={2} as="fieldset">
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
        <FormControl marginBottom={2} as="fieldset">
          <FormLabel as="legend">Complexity</FormLabel>
          <CheckboxGroup
            onChange={(values) => setComplexities(values)}
            colorScheme="green"
            value={complexities}
          >
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              {COMPLEXITIES.map(({ label, value }) => (
                <Checkbox key={`complexity${value}`} value={value}>
                  {label}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>

        <Heading lineHeight="1" textAlign="center" as="h3">
          Group By
        </Heading>
        <FormControl marginBottom={2} as="fieldset">
          <FormLabel as="legend">Best at Count</FormLabel>
          <RadioGroup
            onChange={(value) => setBetAtCount(value)}
            colorScheme="green"
            value={bestAtCount}
          >
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              {PLAYER_COUNTS.map((count, index) => (
                <Radio key={`bestatCount${count}`} value={count}>
                  {count}
                  {index === PLAYER_COUNTS.length - 1 ? "+" : ""}
                </Radio>
              ))}
              <Button onClick={() => setBetAtCount("")}>Clear</Button>
            </Stack>
          </RadioGroup>
        </FormControl>
      </Flex>

      {bestAtCount.length ? (
        <>
          <GameList
            games={groupedGames.best}
            label={`Best at ${bestAtCount}`}
          />
          <GameList
            games={groupedGames.recommended}
            label={`Recommended at ${bestAtCount}`}
          />
          <GameList
            games={groupedGames.notRecommended}
            label={`Not Recommended at ${bestAtCount}`}
          />
        </>
      ) : (
        <GameList games={groupedGames.all} />
      )}
    </Box>
  );
}
