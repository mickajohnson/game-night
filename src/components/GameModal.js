import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const formatPlayerCounts = (poll) => {
  console.log("hi");
  const playerCountData = [];

  poll.results.forEach((playerCount) => {
    const totalVotes = playerCount.result.reduce((acc, count) => {
      return acc + parseInt(count._attributes.numvotes);
    }, 0);

    playerCountData.push({
      numPlayers: playerCount._attributes.numplayers,
      totalVotes,
      ...playerCount.result.reduce((acc, count) => {
        acc[count._attributes.value] = {
          percentage: (
            (parseInt(count._attributes.numvotes) / totalVotes) *
            100
          ).toFixed(1),
          count: count._attributes.numvotes,
        };

        return acc;
      }, {}),
    });
  });

  return playerCountData;
};

export default function GameModal({ game, isOpen, onClose }) {
  const formattedPlayerCounts = isOpen
    ? formatPlayerCounts(game.rawPlayerCounts)
    : [];

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{game.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Th>Players</Th>
                <Th>Best</Th>
                <Th>Recommended</Th>
                <Th>Not Recommended</Th>
                <Th>Vote Count</Th>
              </Thead>
              <Tbody>
                {formattedPlayerCounts.map((count) => (
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
          {/* <Grid gap={4} templateColumns="1fr 1fr 1fr 1fr 1fr"> */}

          {/* </Grid> */}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
