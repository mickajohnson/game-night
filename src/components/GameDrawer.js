import { GROUP_FITS } from "@/modules/GamePage";
import {
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
  let fit = null;
  if (game.fit === GROUP_FITS.BEST) {
    fit = "Best";
  } else if (game.fit === GROUP_FITS.GOOD) {
    fit = "Good";
  } else if (game.fit === GROUP_FITS.BAD) {
    fit = "Bad";
  }

  return (
    <AccordionItem>
      <AccordionButton>
        <Grid
          height="5rem"
          alignItems="center"
          templateColumns="20% 1fr 3rem 3rem"
          columnGap={2}
          flex="1"
        >
          <GridItem display="flex" justifyContent="center">
            <Image maxHeight="5rem" src={game.image} alt={game.title} />
          </GridItem>
          <Text>{game.title}</Text>
          <Text>{fit}</Text>
          <Text>{game.bggScore.toFixed(1)}</Text>
        </Grid>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel pb={4}>
        <Grid rowGap={2} textAlign="center" gridTemplateColumns="1fr 1fr">
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
          <Text>Ages {game.minAge}+</Text>
          <Text>Score: {game.bggScore.toFixed(1)}</Text>
          <Text>Complexity: {game.weight.toFixed(1)}</Text>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}
