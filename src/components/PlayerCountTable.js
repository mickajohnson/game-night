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
} from "@chakra-ui/react";
import PlayerIcon from "public/players";

export default function PlayerCountTable({ game }) {
  return (
    <TableContainer
      marginBottom={3}
      borderBottomWidth={"1px"}
      borderBottomColor="gray.400"
    >
      <Table size="sm" colorScheme="whiteAlpha" variant="simple">
        <Thead>
          <Tr backgroundColor="brand.sea">
            <Th
              sx={{
                svg: {
                  fill: "white",
                },
              }}
            >
              <Icon
                as={PlayerIcon}
                width={3}
                color="white"
                alt="player count"
              />
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
