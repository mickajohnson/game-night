import { Flex, Text, Image } from "@chakra-ui/react";

export default function Game({ game }) {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      borderRadius="3px"
      padding={2}
    >
      <Image width="80%" src={game.image} alt={game.title} />
      <Text>
        {game.minPlaytime === game.maxPlaytime
          ? `${game.minPlaytime}`
          : `${game.minPlaytime} - ${game.maxPlaytime}`}{" "}
        Minutes
      </Text>
      <Text>
        {game.minPlayers === game.maxPlayers
          ? `${game.minPlayers}`
          : `${game.minPlayers} - ${game.maxPlayers}`}{" "}
        Players
      </Text>
      <Text>Best at {game.playerCounts.best.join(", ")} Players</Text>
    </Flex>
  );
}
