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
} from "@chakra-ui/react";
import PlayerCountTable from "./PlayerCountTable";
import useIsDesktop from "@/hooks/useIsDesktop";
import GameDetails from "./GameDetails";
import { useDispatch } from "react-redux";
import { setSelectedGame } from "@/store/selectedGame";

export default function GameDrawer({ game }) {
  let fit = null;
  if (game.fit === GROUP_FITS.BEST) {
    fit = "Best";
  } else if (game.fit === GROUP_FITS.GOOD) {
    fit = "Good";
  } else if (game.fit === GROUP_FITS.BAD) {
    fit = "Bad";
  }

  const dispatch = useDispatch();
  const isDesktop = useIsDesktop();

  const handleButtonClick = () => {
    if (!isDesktop) {
      return;
    }

    dispatch(setSelectedGame(game));
  };

  return (
    <AccordionItem
      _odd={{ backgroundColor: "brand.ice" }}
      _even={{ backgroundColor: "brand.sky" }}
    >
      <AccordionButton onClick={handleButtonClick}>
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
        {isDesktop ? null : <AccordionIcon />}
      </AccordionButton>

      {isDesktop ? null : (
        <AccordionPanel padding={0} backgroundColor="white" pb={4}>
          <PlayerCountTable game={game} />
          <GameDetails game={game} />
        </AccordionPanel>
      )}
    </AccordionItem>
  );
}
