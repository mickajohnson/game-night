import { Box } from "@chakra-ui/react";
import GameList from "./gamePage";
import SignIn from "./signIn";
import { useUsername } from "@/contexts/usernameContext";

export default function Main() {
  const { username } = useUsername();

  if (!username) {
    return <SignIn />;
  }

  return <GameList />;
}
