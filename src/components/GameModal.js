import { Heading, Flex, Image } from "@chakra-ui/react";
import PlayerCountTable from "./PlayerCountTable";
import { useGetUserGamesQuery } from "@/queries/getUserGames";
import GameDetails from "./GameDetails";

const GameModal = ({ game }) => {
  const onClose = () => {};

  return (
    <Flex width="100%" padding={4} paddingTop={9}>
      <Flex
        height="fit-content"
        flexDirection="column"
        borderRadius="md"
        backgroundColor="white"
        marginX="auto"
        padding={4}
      >
        <Flex
          alignItems={{ base: "", xl: "flex-end" }}
          paddingBottom={{ base: 2, xl: "0" }}
          direction={{ base: "column", xl: "row" }}
        >
          <Image
            marginLeft={{ base: "auto", xl: "0" }}
            marginRight={{ base: "auto", xl: 2 }}
            width={{ base: "50%", xl: "auto" }}
            maxHeight={{ base: "", xl: "10rem" }}
            paddingBottom={2}
            src={game.image}
            alt={game.title}
          />

          <Heading>{game.title}</Heading>
        </Flex>

        <Flex direction="column">
          <PlayerCountTable game={game} />
          <GameDetails game={game} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GameModal;
