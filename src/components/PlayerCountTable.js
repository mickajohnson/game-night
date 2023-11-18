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
    <TableContainer>
      <Table size="sm" colorScheme="whiteAlpha" variant="striped">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Best</Th>
            <Th>Good</Th>
            <Th>Bad</Th>
          </Tr>
        </Thead>
        <Tbody>
          {game.playerCountPollData.map((count) => (
            <Tr key={count.numPlayers}>
              <Td fontWeight="semibold">{count.numPlayers}</Td>
              <Td
                color={count.highest === "Best" ? "yellow" : ""}
              >{`${count["Best"].percentage}%`}</Td>
              <Td color={count.highest === "Recommended" ? "yellow" : ""}>
                {`${count["Recommended"].percentage}%`}
              </Td>
              <Td
                color={count.highest === "Not Recommended" ? "yellow" : ""}
              >{`${count["Not Recommended"].percentage}%`}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
