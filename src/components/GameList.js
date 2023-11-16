import { Flex, Grid, Heading } from "@chakra-ui/react";
import Game from "@/components/Game";

export default function GameList({ games, label }) {
  if (!games || !games.length) {
    return null;
  }

  return (
    <Flex direction="column">
      {label ? <Heading as="h5">{label}</Heading> : null}
      <Grid gridGap={2} templateColumns="1fr 1fr 1fr 1fr 1fr">
        {games.map((game) => (
          <Game key={game.id} game={game} />
        ))}
      </Grid>
    </Flex>
  );
}
