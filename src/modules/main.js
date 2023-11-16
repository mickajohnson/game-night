import { Box } from "@chakra-ui/react";
import GameList from "./gameList";
import SignIn from "./signIn";
import { useUsername } from "@/contexts/usernameContext";

export default function Main() {
  const { username } = useUsername();

  if (!username) {
    return (
      <Box as="main" backgroundColor="#2b2b2b" color="#FFF">
        <SignIn />
      </Box>
    );
  }

  return <GameList />;
}
