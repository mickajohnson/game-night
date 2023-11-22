import { useUsername } from "@/contexts/usernameContext";
import styles from "@/styles/Home.module.css";
import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react";
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
    <Box padding={6} as="main">
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          backgroundColor="white"
          name="username"
          onKeyDown={handleSubmit}
        />
        <Button
          marginTop={4}
          width="100%"
          color="white"
          backgroundColor="brand.sea"
          onClick={() => login(name)}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
}
