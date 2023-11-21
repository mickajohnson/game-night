import { useState, useMemo } from "react";
import { useUsername } from "@/contexts/usernameContext";
import {
  Button,
  Flex,
  Accordion,
  Box,
  Checkbox,
  CheckboxGroup,
  Grid,
  FormControl,
  FormLabel,
  Select,
  Input,
  IconButton,
  InputRightElement,
  InputGroup,
  Text,
} from "@chakra-ui/react";
import { setFilter } from "@/store/filters";

import { useGetUserGamesQuery } from "@/queries/getUserGames";
import orderBy from "lodash.orderby";
import GameDrawer from "@/components/GameDrawer";
import { CloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";

export const GROUP_FITS = {
  BEST: 1,
  GOOD: 2,
  BAD: 3,
};

const PLAYER_COUNTS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const COMPLEXITIES = [
  { label: "Light", value: "1" },
  { label: "Medium Light", value: "2" },
  { label: "Medium", value: "3" },
  { label: "Medium Heavy", value: "4" },
  { label: "Heavy", value: "5" },
];

export default function GamesPage({}) {
  const { username } = useUsername();

  const { weights, bestAtCount, searchValue } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();

  const { data } = useGetUserGamesQuery(username);

  const orderedGames = useMemo(() => {
    const games = data || [];

    let filteredGames = games.filter((game) => {
      let shouldNotFilter = true;
      if (shouldNotFilter && bestAtCount.length > 0) {
        const bestAtInt = parseInt(bestAtCount);
        shouldNotFilter =
          bestAtInt >= game.minPlayers && bestAtInt <= game.maxPlayers;
      }

      const roundedWeight = Math.round(game.weight);

      if (shouldNotFilter && weights.length > 0) {
        shouldNotFilter = weights.includes(`${roundedWeight}`);
      }

      if (shouldNotFilter && searchValue.length) {
        shouldNotFilter = game.title
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }

      return shouldNotFilter;
    });

    if (!bestAtCount.length) {
      return orderBy(filteredGames, "bggScore", "desc");
    }

    const bestAtNumber = parseInt(bestAtCount);

    filteredGames = filteredGames.map((game) => {
      if (game.playerCounts.best.includes(bestAtNumber)) {
        return { ...game, fit: GROUP_FITS.BEST };
      } else if (game.playerCounts.recommended.includes(bestAtNumber)) {
        return { ...game, fit: GROUP_FITS.GOOD };
      } else {
        return { ...game, fit: GROUP_FITS.BAD };
      }
    });

    return orderBy(filteredGames, ["fit", "bggScore"], ["asc", "desc"]);
  }, [data, bestAtCount, weights, searchValue]);

  // const chakraStyles = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     color: "black",
  //   }),
  //   downChevron: (provided, state) => ({
  //     ...provided,
  //     color: "black",
  //   }),
  // };

  return (
    <Box paddingBottom={10} as="main" backgroundColor="#2b2b2b" color="#FFF">
      <Flex
        direction="column"
        borderRadius="3px"
        borderColor="#AAA"
        borderWidth="1px"
        justifyContent="center"
        alignItems="center"
        padding={4}
        margin={6}
      >
        <Select
          value={bestAtCount}
          onChange={({ target }) =>
            dispatch(
              setFilter({
                filterName: "bestAtCount",
                filterValue: target.value,
              })
            )
          }
          placeholder="Select Player Count"
          marginBottom={2}
          size="sm"
        >
          {PLAYER_COUNTS.map((count, index) => (
            <option key={`playerCount${count}`} value={count}>
              {count}
              {index === PLAYER_COUNTS.length - 1 ? "+" : ""}
            </option>
          ))}
        </Select>

        <FormControl marginBottom={2}>
          <InputGroup>
            <Input
              color="#AAA"
              name="game"
              value={searchValue}
              onChange={({ target }) =>
                dispatch(
                  setFilter({
                    filterName: "searchValue",
                    filterValue: target.value,
                  })
                )
              }
              placeholder="Title Search"
              size="sm"
              _placeholder={{ opacity: 1, color: "#AAA" }}
            />
            <InputRightElement width={8} height={8}>
              <IconButton
                width={5}
                height={5}
                minWidth={0}
                size="xs"
                icon={<CloseIcon height={2} width={2} />}
                isRound
                variant="outline"
                color="#AAA"
                onClick={() =>
                  dispatch(
                    setFilter({ filterName: "searchValue", filterValue: "" })
                  )
                }
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl as="fieldset">
          <FormLabel fontSize="sm" as="legend">
            Complexity Level
          </FormLabel>
          {/* <ReactSelect
            placeholder="Complexity"
            onChange={(options) =>
              setComplexities(options.map((option) => option.value))
            }
            chakraStyles={chakraStyles}
            colorScheme="purple"
            isMulti
            options={COMPLEXITIES}
          /> */}

          <CheckboxGroup
            onChange={(values) =>
              dispatch(
                setFilter({ filterName: "weights", filterValue: values })
              )
            }
            colorScheme="green"
            value={weights}
          >
            <Grid templateColumns="repeat(auto-fill, minmax(3rem, 1fr) )">
              {COMPLEXITIES.map(({ label, value }) => (
                <Checkbox size="sm" key={`complexity${value}`} value={value}>
                  {value}
                </Checkbox>
              ))}
            </Grid>
          </CheckboxGroup>
        </FormControl>
      </Flex>

      <Grid
        height="2rem"
        alignItems="center"
        templateColumns="20% 1fr 3rem 3rem"
        columnGap={2}
        justifyItems="center"
        paddingLeft={4}
        paddingRight={9}
      >
        <Text fontWeight="semibold"></Text>
        <Text fontWeight="semibold">Name</Text>
        <Text fontWeight="semibold">{bestAtCount.length ? "Fit" : ""}</Text>
        <Text fontWeight="semibold">Score</Text>
      </Grid>
      <Box overflowY="auto" height="calc(100vh - 19rem)" position="relative">
        <Accordion allowToggle>
          {orderedGames.map((game) => (
            <GameDrawer key={game.id} game={game} />
          ))}
        </Accordion>
      </Box>
    </Box>
  );
}
