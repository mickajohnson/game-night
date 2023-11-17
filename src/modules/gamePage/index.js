import { useState, useMemo } from "react";
import { useUsername } from "@/contexts/usernameContext";
import {
  Button,
  Flex,
  Accordion,
  Box,
  Checkbox,
  CheckboxGroup,
  Stack,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

import { useGetUserGamesQuery } from "@/queries/getUserGames";
import orderBy from "lodash.orderby";
import GameDrawer from "@/components/GameDrawer";

export const GROUP_FITS = {
  BEST: 1,
  GOOD: 2,
  BAD: 3,
};

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

  const orderedGames = useMemo(() => {
    const games = data || [];

    let filteredGames = games.filter((game) => {
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
      return orderBy(filteredGames, "bggScore", "desc");
    }

    const bestAtNumber = parseInt(bestAtCount);

    filteredGames = filteredGames.map((game) => {
      if (game.playerCounts.best.includes(bestAtNumber)) {
        return { ...game, fit: GROUP_FITS.BEST };
      } else if (game.playerCounts.recommended.includes(bestAtNumber)) {
        return { ...game, fit: GROUP_FITS.GOOD };
      } else {
        return { ...game, fit: GROUP_FITS.BAD };
      }
    });

    return orderBy(filteredGames, ["fit", "bggScore"], ["asc", "desc"]);
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

      <Accordion allowToggle>
        {orderedGames.map((game) => (
          <GameDrawer key={game.id} game={game} />
        ))}
      </Accordion>
    </Box>
  );
}
