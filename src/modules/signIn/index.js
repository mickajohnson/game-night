import { useUsername } from "@/contexts/usernameContext";
import styles from "@/styles/Home.module.css";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function SignIn({}) {
  const { setUsername } = useUsername();

  const handleSubmit = (event) => {
    if (event.keyCode === 13) {
      setUsername(event.target.value);
    }
  };
  return (
    <FormControl>
      <FormLabel htmlFor="username">Username</FormLabel>
      <Input name="username" onKeyDown={handleSubmit} />
    </FormControl>
  );
}
