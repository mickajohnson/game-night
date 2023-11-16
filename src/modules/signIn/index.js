import { useUsername } from "@/contexts/usernameContext";
import styles from "@/styles/Home.module.css";

export default function SignIn({}) {
  const { setUsername } = useUsername();

  const handleSubmit = (event) => {
    if (event.keyCode === 13) {
      setUsername(event.target.value);
    }
  };
  return (
    <main className={styles.main}>
      <label htmlFor="username">
        Username
        <input name="username" onKeyDown={handleSubmit} />
      </label>
    </main>
  );
}
