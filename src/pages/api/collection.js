import axios from "axios";

const AUTH_TOKEN = process.env.BGG_AUTH_TOKEN;

const handler = async (req, res) => {
  const { username } = req.query;

  console.log(AUTH_TOKEN);

  try {
    if (username) {
      // Fetch user's collection
      const { data } = await axios.get(
        `https://api.geekdo.com/xmlapi2/collection?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        }
      );
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: "Invalid request" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data from external API" });
  }
};

export default handler;
