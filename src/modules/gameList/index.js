import { useUsername } from "@/contexts/usernameContext";
import styles from "@/styles/Home.module.css";
import convert from "xml-js";
import { useQuery } from "react-query";
import axios from "axios";

const getUsersGames = async (username) => {
  const { data } = await axios.get(
    `https://api.geekdo.com/xmlapi2/collection?username=${username}&versions=1`
  );
  const bggResponse = convert.xml2js(data, { compact: true });

  console.log(bggResponse.items.item);

  return bggResponse.items.item.filter(
    (game) => game.status._attributes.own === "1"
  );
};

export default function GameList({}) {
  const { username, setUsername } = useUsername();

  const handleLogout = () => {
    setUsername(null);
  };

  const { data: games } = useQuery({
    queryKey: ["usersGames", username],
    queryFn: () => getUsersGames(username),
    placeholderData: [],
  });

  return (
    <main className={styles.main}>
      <button onClick={handleLogout}>Logout</button>
      <h1>{username}'s Games</h1>
      <ul>
        {games &&
          games.map((game) => (
            <li key={game._attributes.objectid}>{game.name._text}</li>
          ))}
      </ul>
    </main>
  );
}
