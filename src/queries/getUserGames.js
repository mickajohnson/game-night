import convert from "xml-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const calculateBestPlayerCounts = (poll) => {
  const playerCounts = {
    best: [],
    recommended: [],
    notRecommended: [],
  };

  poll.forEach((playerCount) => {
    const bestVotes = parseInt(playerCount.result[0]._attributes.numvotes);
    const recVotes = parseInt(playerCount.result[1]._attributes.numvotes);
    const notRecVotes = parseInt(playerCount.result[2]._attributes.numvotes);
    if (bestVotes > recVotes && bestVotes > notRecVotes) {
      playerCounts.best.push(parseInt(playerCount._attributes.numplayers));
    } else if (recVotes > notRecVotes) {
      playerCounts.recommended.push(
        parseInt(playerCount._attributes.numplayers)
      );
    } else {
      playerCounts.notRecommended.push(
        parseInt(playerCount._attributes.numplayers)
      );
    }
  });

  return playerCounts;
};

const transformGame = (game) => {
  const primaryName =
    game.name.find((name) => name._attributes.type === "primary") ||
    game.name[0];

  const bestPlayerCountPoll =
    game.poll.find(
      (poll) => poll._attributes.name === "suggested_numplayers"
    ) || game.poll[0];

  return {
    id: game._attributes.id,
    title: primaryName._attributes.value,
    image: game.image._text,
    maxPlayers: parseInt(game.maxplayers._attributes.value),
    minPlayers: parseInt(game.minplayers._attributes.value),
    maxPlaytime: parseInt(game.maxplaytime._attributes.value),
    minPlaytime: parseInt(game.minplaytime._attributes.value),
    playerCounts: calculateBestPlayerCounts(bestPlayerCountPoll.results),
    weight: parseFloat(game.statistics.ratings.averageweight._attributes.value),
  };
};

const getUsersGames = async (username) => {
  const { data } = await axios.get(
    `https://api.geekdo.com/xmlapi2/collection?username=${username}`
  );
  const bggResponse = convert.xml2js(data, { compact: true });

  const ownedGames = bggResponse.items.item.filter(
    (game) => game.status._attributes.own === "1"
  );

  const gamePromises = [ownedGames[2], ownedGames[3], ownedGames[4]].map(
    (game) =>
      axios.get(
        `https://api.geekdo.com/xmlapi2/thing?id=${game._attributes.objectid}&stats=1`
      )
  );

  const results = await Promise.all(gamePromises);

  const games = results.map(({ data }) => {
    const convertedGame = convert.xml2js(data, { compact: true });
    console.log(convertedGame.items.item);
    return transformGame(convertedGame.items.item);
  });

  return games;
};

export const useGetUserGamesQuery = (username) => {
  return useQuery({
    queryKey: ["usersGames", username],
    queryFn: () => getUsersGames(username),
    placeholderData: [],
    staleTime: Infinity,
  });
};
