import { useUsername } from "@/contexts/usernameContext";
import styles from "@/styles/Home.module.css";
import { FormControl, FormLabel, Input, Box } from "@chakra-ui/react";

export default function SignIn({}) {
  const { login } = useUsername();

  const handleSubmit = (event) => {
    if (event.keyCode === 13) {
      login(event.target.value);
    }
  };
  return (
    <Box padding={6} as="main">
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input color="#AAA" name="username" onKeyDown={handleSubmit} />
      </FormControl>
    </Box>
  );
}
