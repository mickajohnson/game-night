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

const formatPlayerCountPoll = (poll) => {
  const playerCountData = [];

  poll.results.forEach((playerCount) => {
    const totalVotes = playerCount.result.reduce((acc, count) => {
      return acc + parseInt(count._attributes.numvotes);
    }, 0);

    const entry = {
      numPlayers: playerCount._attributes.numplayers,
      highest: null,
      totalVotes,
      ...playerCount.result.reduce((acc, count) => {
        acc[count._attributes.value] = {
          percentage: (parseInt(count._attributes.numvotes) / totalVotes) * 100,
          count: count._attributes.numvotes,
        };

        return acc;
      }, {}),
    };

    if (
      entry["Best"].percentage >= entry["Recommended"].percentage &&
      entry["Best"].percentage > entry["Not Recommended"].percentage
    ) {
      entry.highest = "Best";
    } else if (
      entry["Recommended"].percentage > entry["Best"].percentage &&
      entry["Recommended"].percentage > entry["Not Recommended"].percentage
    ) {
      entry.highest = "Recommended";
    } else if (
      entry["Not Recommended"].percentage >= entry["Recommended"].percentage &&
      entry["Not Recommended"].percentage > entry["Best"].percentage
    ) {
      entry.highest = "Not Recommended";
    }

    playerCountData.push(entry);
  });

  return playerCountData;
};

const transformGame = (game) => {
  const primaryName = Array.isArray(game.name)
    ? game.name.find((name) => name._attributes.type === "primary") ||
      game.name[0]
    : game.name;

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
    minAge: game.minage._attributes.value,
    playerCounts: calculateBestPlayerCounts(bestPlayerCountPoll.results),
    playerCountPollData: formatPlayerCountPoll(bestPlayerCountPoll),
    weight: parseFloat(game.statistics.ratings.averageweight._attributes.value),
    bggScore: parseFloat(game.statistics.ratings.average._attributes.value),
  };
};

const getUsersGames = async (username) => {
  const { data } = await axios.get(
    `https://api.geekdo.com/xmlapi2/collection?username=${username}`
  );
  const bggResponse = convert.xml2js(data, { compact: true });

  const responseGames = Array.isArray(bggResponse.items.item)
    ? bggResponse.items.item
    : [bggResponse.items.item];
  const ownedGames = responseGames.filter(
    (game) => game.status._attributes.own === "1"
  );

  let timeout = 0

  const gamePromises = ownedGames.map((game) =>
    {
      timeout += 500
      return new Promise((resolve) => {
        setTimeout(async  () => {
          const response = await axios.get(
            `https://api.geekdo.com/xmlapi2/thing?id=${game._attributes.objectid}&stats=1`
          )
          resolve(response)
        }, timeout)
     
    })}
  );

  const results = await Promise.all(gamePromises);

  const games = results
    .map(({ data }) => {
      const convertedGame = convert.xml2js(data, { compact: true });
      try {
        return transformGame(convertedGame.items.item);
      } catch (e) {
        console.error(e);
        return null;
      }
    })
    .filter((game) => game);

  return games;
};

export const useGetUserGamesQuery = (username) => {
  return useQuery({
    queryKey: ["usersGames", username],
    queryFn: () => getUsersGames(username),
    staleTime: Infinity,
    enabled: !!username,
  });
};
