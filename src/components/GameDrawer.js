import { GROUP_FITS } from "@/components/Filters";
import {
  Text,
  Image,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  GridItem,
  Box,
  Icon,
} from "@chakra-ui/react";
import PlayerCountTable from "./PlayerCountTable";
import PlayerIcon from "@/icons/players.svg";

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
    <AccordionItem
      _odd={{ backgroundColor: "brand.ice" }}
      _even={{ backgroundColor: "brand.sky" }}
    >
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
          <Text textAlign="left" fontWeight="semibold">
            {game.title}
          </Text>
          <Text>{fit}</Text>
          <Text>{game.bggScore.toFixed(1)}</Text>
        </Grid>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel padding={0} backgroundColor="white" pb={4}>
        <PlayerCountTable game={game} />
        <Grid rowGap={2} gridTemplateColumns="1fr 1fr">
          <Box paddingLeft={3} display="flex" alignItems="center">
            <Image marginRight={1.5} width={5} src="/timer.svg" alt="Ages" />
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
            <Image marginRight={1.5} width={5} src="/weight.svg" alt="Ages" />
            <Text fontSize="sm">{game.weight.toFixed(1)} Weight</Text>
          </Box>
        </Grid>
      </AccordionPanel>
    </AccordionItem>
  );
}
