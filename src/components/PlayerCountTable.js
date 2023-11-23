import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

export default function PlayerCountTable({ game }) {
  return (
    <TableContainer
      marginBottom={3}
      borderBottomWidth={"1px"}
      borderBottomColor="gray.400"
    >
      <Table size="sm" colorScheme="whiteAlpha" variant="striped">
        <Thead>
          <Tr backgroundColor="brand.sea">
            <Th></Th>
            <Th color="white">Best</Th>
            <Th color="white">Good</Th>
            <Th color="white">Bad</Th>
          </Tr>
        </Thead>
        <Tbody>
          {game.playerCountPollData.map((count) => (
            <Tr key={count.numPlayers}>
              <Td fontWeight="semibold">{count.numPlayers}</Td>
              <Td
                fontWeight={count.highest === "Best" ? "semibold" : ""}
              >{`${count["Best"].percentage.toFixed(1)}%`}</Td>
              <Td
                fontWeight={count.highest === "Recommended" ? "semibold" : ""}
              >
                {`${count["Recommended"].percentage.toFixed(1)}%`}
              </Td>
              <Td
                fontWeight={
                  count.highest === "Not Recommended" ? "semibold" : ""
                }
              >{`${count["Not Recommended"].percentage.toFixed(1)}%`}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
