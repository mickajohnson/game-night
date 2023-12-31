import { useUsername } from "@/contexts/usernameContext";
import { FormControl, FormLabel, Input, Flex, Button } from "@chakra-ui/react";
import { useState } from "react";

export default function SignIn({}) {
  const { login } = useUsername();
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    if (event.keyCode === 13) {
      login(name);
    }
  };
  return (
    <Flex
      direction="column"
      alignItems="center"
      margin="auto"
      maxWidth="container.md"
      padding={6}
      as="main"
    >
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          backgroundColor="white"
          name="username"
          onKeyDown={handleSubmit}
        />
      </FormControl>
      <Button
        marginTop={4}
        maxWidth={{ base: "100%", md: 64 }}
        marginX="auto"
        width="100%"
        color="white"
        backgroundColor="brand.sea.400"
        _hover={{ backgroundColor: "brand.sea.500" }}
        _active={{ backgroundColor: "brand.sea.600" }}
        onClick={() => login(name)}
      >
        Submit
      </Button>
    </Flex>
  );
}
