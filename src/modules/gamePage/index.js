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
  Select,
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
  const { username } = useUsername();

  const [complexities, setComplexities] = useState([]);
  const [bestAtCount, setBestAtCount] = useState("");

  const { data } = useGetUserGamesQuery(username);

  const groupedGames = useMemo(() => {
    const games = data || [];

    const filteredGames = games.filter((game) => {
      let shouldNotFilter = true;
      if (shouldNotFilter && bestAtCount.length > 0) {
        const bestAtInt = parseInt(bestAtCount);
        shouldNotFilter =
          bestAtInt >= game.minPlayers && bestAtInt <= game.maxPlayers;
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
  }, [data, bestAtCount, complexities]);

  return (
    <Box padding={6} as="main" backgroundColor="#2b2b2b" color="#FFF">
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
        <Select
          value={bestAtCount}
          onChange={({ target }) => setBestAtCount(target.value)}
          placeholder="Select Player Count"
          marginBottom={2}
        >
          {PLAYER_COUNTS.map((count, index) => (
            <option key={`playerCount${count}`} value={count}>
              {count}
              {index === PLAYER_COUNTS.length - 1 ? "+" : ""}
            </option>
          ))}
        </Select>

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
