import { useMemo } from "react";
import {
  Accordion,
  Box,
  Grid,
  Text,
  Spinner,
  Link,
  Button,
} from "@chakra-ui/react";
import { Link as NextLink } from "@chakra-ui/next-js";
import { useGetUserGamesQuery } from "@/queries/getUserGames";
import orderBy from "lodash.orderby";
import GameDrawer from "@/components/GameDrawer";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_FITS } from "@/components/Filters";
import { useUsername } from "@/contexts/usernameContext";
import { clearFilters } from "@/store/filters";

const Container = ({ children, ...props }) => {
  return (
    <Box maxWidth="container.md" as="main" {...props}>
      {children}
    </Box>
  );
};

export default function GamesPage({}) {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);
  const { weights, bestAtCount, searchValue } = useSelector(
    (state) => state.filters
  );
  const { data, isLoading, isError } = useGetUserGamesQuery(username);
  const { logout } = useUsername();

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

  const filtersAreApplied =
    weights.length > 0 || bestAtCount.length > 0 || searchValue.length > 0;

  if (isLoading) {
    return (
      <Container display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" marginTop={20} />
      </Container>
    );
  }

  if (!username) {
    return (
      <Container alignItems="center" justifyContent="center">
        <Text marginTop={6} textAlign="center" fontSize="lg">
          You need to enter a username before seeing a game collection.
        </Text>

        <NextLink
          display="block"
          marginTop={4}
          textAlign="center"
          color="blue.600"
          href="/username"
          fontSize="lg"
        >
          Enter your username here
        </NextLink>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container alignItems="center" justifyContent="center">
        <Text marginTop={6} textAlign="center" fontSize="xl">
          We hit a snag trying to get that user&apos;s games.
        </Text>

        <NextLink
          display="block"
          marginTop={4}
          textAlign="center"
          color="blue.600"
          fontSize="lg"
          href="/username"
          onClick={logout}
        >
          Try logging out
        </NextLink>
      </Container>
    );
  }

  if (orderedGames.length === 0 && filtersAreApplied) {
    return (
      <Container
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text marginTop={6} textAlign="center" fontSize="2xl">
          No Games Found
        </Text>

        <Button
          fontSize="lg"
          marginTop={2}
          onClick={() => dispatch(clearFilters())}
          backgroundColor="brand.sea.400"
          color="white"
          _hover={{ backgroundColor: "brand.sea.500" }}
          _active={{ backgroundColor: "brand.sea.600" }}
        >
          Try clearing your filters
        </Button>
      </Container>
    );
  }

  if (orderedGames.length === 0) {
    return (
      <Container alignItems="center" justifyContent="center">
        <Text marginTop={6} textAlign="center" fontSize="xl">
          Your collection seems to be empty.
        </Text>

        <Link
          display="block"
          marginTop={4}
          textAlign="center"
          color="blue.600"
          target="_blank"
          href="https://boardgamegeek.com/"
          rel="noopener noreferrer"
          fontSize="lg"
          paddingX={6}
        >
          Try adding games on BoardGameGeek first
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      <Grid
        height="2rem"
        alignItems="center"
        templateColumns="20% 1fr 3rem 3rem"
        columnGap={2}
        justifyItems="center"
        paddingLeft={4}
        paddingRight={9}
        backgroundColor="brand.lava"
      >
        <Text fontWeight="semibold"></Text>
        <Text fontWeight="semibold">Name</Text>
        <Text fontWeight="semibold">{bestAtCount.length ? "Fit" : ""}</Text>
        <Text fontWeight="semibold">Score</Text>
      </Grid>
      <Box
        paddingBottom={18}
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
    </Container>
  );
}
