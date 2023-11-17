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

export default function GameModal({ game, isOpen, onClose }) {
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
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
