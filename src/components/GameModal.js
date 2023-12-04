import { Heading, Flex, Image } from "@chakra-ui/react";
import PlayerCountTable from "./PlayerCountTable";
import { useGetUserGamesQuery } from "@/queries/getUserGames";
import GameDetails from "./GameDetails";
import { useSelector } from "react-redux";
import selectedGame from "@/store/selectedGame";

const GameModal = () => {
  const onClose = () => {};

  const { selectedGame: game } = useSelector((store) => store.selectedGame);

  if (!game) {
    return <Flex />;
  }

  return (
    <Flex width="100%" padding={4} paddingTop={9}>
      <Flex
        height="fit-content"
        flexDirection="column"
        borderRadius="md"
        backgroundColor="white"
        marginX="auto"
        padding={4}
        width="100%"
        maxWidth="40rem"
      >
        <Flex
          alignItems={{ base: "", xl: "flex-end" }}
          paddingBottom={{ base: 2, xl: "0" }}
          direction={{ base: "column", xl: "row" }}
        >
          <Image
            marginLeft={{ base: "auto", xl: "0" }}
            marginRight={{ base: "auto", xl: 2 }}
            width="auto"
            maxHeight="10rem"
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
