import { Flex, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
import GameModal from "./GameModal";

export default function Game({ game }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        borderRadius="3px"
        padding={2}
        onClick={() => setModalOpen(true)}
        cursor="pointer" // TODO - Make accessible
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
      <GameModal
        game={game}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
