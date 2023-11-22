import {
  Flex,
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
} from "@chakra-ui/react";
import { setFilter } from "@/store/filters";

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

export default function Filters() {
  const { weights, bestAtCount, searchValue } = useSelector(
    (state) => state.filters
  );
  const dispatch = useDispatch();
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      paddingY={1}
    >
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

      <FormControl as="fieldset">
        <FormLabel fontSize="sm" as="legend">
          Complexity Level
        </FormLabel>

        <CheckboxGroup
          onChange={(values) =>
            dispatch(setFilter({ filterName: "weights", filterValue: values }))
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
  );
}
