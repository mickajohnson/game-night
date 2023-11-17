import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
import { useUsername } from "@/contexts/usernameContext";

export default function Header() {
  const { logout } = useUsername();
  return (
    <Box
      position="sticky"
      top={0}
      height={10}
      width="100%"
      backgroundColor="#AAA"
      zIndex={1}
    >
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem onClick={logout} icon={<RepeatIcon />}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
