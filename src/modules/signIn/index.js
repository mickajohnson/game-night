import { useUsername } from "@/contexts/usernameContext";
import styles from "@/styles/Home.module.css";
import { FormControl, FormLabel, Input, Box } from "@chakra-ui/react";

export default function SignIn({}) {
  const { setUsername } = useUsername();

  const handleSubmit = (event) => {
    if (event.keyCode === 13) {
      setUsername(event.target.value);
    }
  };
  return (
    <Box padding={6} as="main" backgroundColor="#2b2b2b" color="#FFF">
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input color="#2b2b2b" name="username" onKeyDown={handleSubmit} />
      </FormControl>
    </Box>
  );
}
