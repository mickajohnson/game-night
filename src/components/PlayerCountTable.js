import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Icon,
  Flex,
} from "@chakra-ui/react";
import PlayerIcon from "@/icons/players.svg";

export default function PlayerCountTable({ game }) {
  return (
    <TableContainer
      marginBottom={3}
      borderBottomWidth={"1px"}
      borderBottomColor="gray.400"
    >
      <Table size="sm" colorScheme="whiteAlpha" variant="simple">
        <Thead>
          <Tr backgroundColor="brand.sea.400">
            <Th paddingY={0}>
              <Flex justifyContent="center" alignItems="center">
                <Icon
                  margin="auto"
                  as={PlayerIcon}
                  width={4}
                  height="auto"
                  color="white"
                  alt="player count"
                />
              </Flex>
            </Th>
            <Th textAlign="center" color="white">
              Best
            </Th>
            <Th textAlign="center" color="white">
              Good
            </Th>
            <Th textAlign="center" color="white">
              Bad
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {game.playerCountPollData.map((count) => (
            <Tr key={count.numPlayers}>
              <Td textAlign="center" fontWeight="semibold">
                {count.numPlayers}
              </Td>
              <Td
                textAlign="center"
                fontWeight={count.highest === "Best" ? "semibold" : ""}
                backgroundColor={count.highest === "Best" ? "brand.matcha" : ""}
              >{`${Math.round(count["Best"].percentage)}%`}</Td>
              <Td
                textAlign="center"
                fontWeight={count.highest === "Recommended" ? "semibold" : ""}
                background={
                  count.highest === "Recommended" ? "brand.matcha" : ""
                }
              >
                {`${Math.round(count["Recommended"].percentage)}%`}
              </Td>
              <Td
                textAlign="center"
                fontWeight={
                  count.highest === "Not Recommended" ? "semibold" : ""
                }
                backgroundColor={
                  count.highest === "Not Recommended" ? "brand.lava" : ""
                }
              >{`${Math.round(count["Not Recommended"].percentage)}%`}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
