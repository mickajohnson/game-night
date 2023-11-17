import { GROUP_FITS } from "@/modules/gamePage";
import {
  Flex,
  Text,
  Image,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import PlayerCountTable from "./PlayerCountTable";

export default function GameDrawer({ game }) {
  return (
    <AccordionItem>
      <AccordionButton>
        <Grid
          height="5rem"
          alignItems="center"
          templateColumns="20% 1fr 1fr 1fr"
          flex="1"
        >
          <Image
            maxWidth="30%"
            maxHeight="80%"
            src={game.image}
            alt={game.title}
          />
          <Text>{game.title}</Text>
          <Text>
            {game.fit === GROUP_FITS.BEST
              ? "Best Fit"
              : game.fit === GROUP_FITS.GOOD
              ? "Good Fit"
              : "Bad Fit"}
          </Text>
          <Text>{game.bggScore.toFixed(1)}</Text>
        </Grid>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel pb={4}>
        <Grid gridTemplateColumns="1fr 1fr">
          <GridItem colSpan={"2"}>
            <PlayerCountTable game={game} />
          </GridItem>
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
          <Text>Score: {game.bggScore.toFixed(1)}</Text>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}
