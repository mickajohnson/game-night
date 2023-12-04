import { Text, Image, Grid, Box, Icon } from "@chakra-ui/react";
import PlayerIcon from "@/icons/players.svg";

const GameDetails = ({ game }) => {
  return (
    <Grid rowGap={2} gridTemplateColumns="1fr 1fr">
      <Box paddingLeft={3} display="flex" alignItems="center">
        <Image marginRight={1.5} width={5} src="/timer.svg" alt="Game Time" />
        <Text fontSize="sm">
          {game.minPlaytime === game.maxPlaytime
            ? `${game.minPlaytime}`
            : `${game.minPlaytime} - ${game.maxPlaytime}`}{" "}
          Min
        </Text>
      </Box>
      <Box paddingLeft={3} display="flex" alignItems="center">
        <Image marginRight={1.5} width={5} src="/baby.svg" alt="Ages" />
        <Text fontSize="sm">{game.minAge}+ Ages</Text>
      </Box>
      <Box paddingLeft={3} display="flex" alignItems="center">
        <Icon
          marginRight={1.5}
          as={PlayerIcon}
          height="auto"
          width={5}
          color="brand.icon"
          alt="player count"
        />
        <Text fontSize="sm">
          {game.minPlayers === game.maxPlayers
            ? `${game.minPlayers}`
            : `${game.minPlayers} - ${game.maxPlayers}`}{" "}
          Players, Best {game.playerCounts.best.join(", ")}
        </Text>
      </Box>

      <Box paddingLeft={3} display="flex" alignItems="center">
        <Image marginRight={1.5} width={5} src="/weight.svg" alt="Weight" />
        <Text fontSize="sm">{game.weight.toFixed(1)} Weight</Text>
      </Box>
    </Grid>
  );
};

export default GameDetails;
