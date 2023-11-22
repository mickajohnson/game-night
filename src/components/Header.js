import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  RepeatIcon,
  SearchIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import { useUsername } from "@/contexts/usernameContext";
import { useRouter } from "next/router";
import Filters from "./Filters";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters } from "@/store/filters";

export default function Header() {
  const { logout } = useUsername();
  const username = useSelector((state) => state.user.username);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Box
      position="sticky"
      top={0}
      height={12}
      width="100%"
      backgroundColor="brand.sea"
      zIndex={1}
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      paddingLeft={14}
    >
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
          border="none"
          color="white"
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
      <Heading
        fontFamily="'Vina Sans', sans-serif"
        color="white"
        fontWeight="400"
        as="h1"
      >
        Game Night!
      </Heading>
      {router.pathname === "/games" && (
        <Popover placement="bottom-end">
          {({ onClose }) => (
            <>
              <PopoverTrigger>
                <IconButton
                  position="absolute"
                  right={3}
                  icon={<SearchIcon />}
                />
              </PopoverTrigger>

              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Filters</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Filters />
                </PopoverBody>
                <PopoverFooter
                  display="flex"
                  gap={3}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Button flex="1" onClick={() => dispatch(clearFilters())}>
                    Clear All
                  </Button>
                  <Button
                    flex="1"
                    backgroundColor="brand.sea"
                    color="white"
                    onClick={() => onClose()}
                  >
                    Close
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </>
          )}
        </Popover>
      )}
    </Box>
  );
}
