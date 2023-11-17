import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, RepeatIcon, ViewIcon } from "@chakra-ui/icons";
import { useUsername } from "@/contexts/usernameContext";
import { useRouter } from "next/router";

export default function Header() {
  const { username, logout } = useUsername();
  const router = useRouter();
  return (
    <Box
      position="sticky"
      top={0}
      height={12}
      width="100%"
      backgroundColor="#AAA"
      zIndex={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
          position="absolute"
          left={3}
        />
        <MenuList>
          {username ? (
            <>
              <MenuItem onClick={logout} icon={<RepeatIcon />}>
                Logout
              </MenuItem>
              <MenuItem
                onClick={() => router.push("/games")}
                icon={<ViewIcon />}
              >
                View {username}&apos;s Games
              </MenuItem>
            </>
          ) : (
            <MenuItem
              onClick={() => router.push("/username")}
              icon={<RepeatIcon />}
            >
              Login
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <Heading as="h1">Game Night Picker</Heading>
    </Box>
  );
}
