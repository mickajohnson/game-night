import { useMemo } from "react";
import { Accordion, Box, Grid, Text } from "@chakra-ui/react";

import { useGetUserGamesQuery } from "@/queries/getUserGames";
import orderBy from "lodash.orderby";
import GameDrawer from "@/components/GameDrawer";
import { useSelector } from "react-redux";
import { GROUP_FITS } from "@/components/Filters";

export default function GamesPage({}) {
  const username = useSelector((state) => state.user.username);
  const { weights, bestAtCount, searchValue } = useSelector(
    (state) => state.filters
  );
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

      if (shouldNotFilter && weights.length > 0) {
        shouldNotFilter = weights.includes(`${roundedWeight}`);
      }

      if (shouldNotFilter && searchValue.length) {
        shouldNotFilter = game.title
          .toLowerCase()
          .includes(searchValue.toLowerCase());
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
  }, [data, bestAtCount, weights, searchValue]);

  return (
    <Box as="main" backgroundColor="#2b2b2b" color="#FFF">
      <Grid
        height="2rem"
        alignItems="center"
        templateColumns="20% 1fr 3rem 3rem"
        columnGap={2}
        justifyItems="center"
        paddingLeft={4}
        paddingRight={9}
      >
        <Text fontWeight="semibold"></Text>
        <Text fontWeight="semibold">Name</Text>
        <Text fontWeight="semibold">{bestAtCount.length ? "Fit" : ""}</Text>
        <Text fontWeight="semibold">Score</Text>
      </Grid>
      <Box
        paddingBottom={6}
        overflowY="auto"
        height="calc(100vh - 5rem)"
        position="relative"
      >
        <Accordion allowToggle>
          {orderedGames.map((game) => (
            <GameDrawer key={game.id} game={game} />
          ))}
        </Accordion>
      </Box>
    </Box>
  );
}
