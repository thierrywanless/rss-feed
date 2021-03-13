import axios from "axios";

export const fetchFeed = async (source) => {
  const url = encodeURIComponent(source.url);

  const result = await axios.get(
    `https://api.rss2json.com/v1/api.json?rss_url=${url}`
  );

  return result.data;
};
