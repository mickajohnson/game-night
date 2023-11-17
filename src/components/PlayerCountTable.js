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
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Players</Th>
            <Th>Best</Th>
            <Th>Recommended</Th>
            <Th>Not Recommended</Th>
            <Th>Vote Count</Th>
          </Tr>
        </Thead>
        <Tbody>
          {game.playerCountPollData.map((count) => (
            <Tr key={count.numPlayers}>
              <Td fontWeight="semibold">{count.numPlayers}</Td>
              <Td>{`${count["Best"].percentage}% (${count["Best"].count})`}</Td>
              <Td>{`${count["Recommended"].percentage}% (${count["Recommended"].count})`}</Td>
              <Td>{`${count["Not Recommended"].percentage}% (${count["Not Recommended"].count})`}</Td>
              <Td>{count.totalVotes}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
