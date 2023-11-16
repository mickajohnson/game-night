import { useUsername } from "@/contexts/usernameContext";
import styles from "@/styles/Home.module.css";

export default function GameList({}) {
  const { username, setUsername } = useUsername();

  const handleLogout = () => {
    setUsername(null);
  };

  return (
    <main className={styles.main}>
      <button onClick={handleLogout}>Logout</button>
      <h1>{username}'s Games</h1>
    </main>
  );
}
