import React from "react";
import { useQuery } from "react-query";
import PropTypes from "prop-types";

import "./FeedList.css";
import { fetchFeed } from "../data/FeedAPI";
import List from "./List";

/**
 * Provides a list of articles based on the return of an RSS feed
 */
const FeedList = ({ source }) => {
  // Fetch data
  const { isLoading, error, data } = useQuery(
    source.url,
    async () => await fetchFeed(source),
    {
      staleTime: 3_600_000,
    }
  );

  // If the feed is loading, display loading spinner
  if (isLoading) {
    return (
      <div className="my-10 divide-y rounded-xl shadow-lg border flex justify-center items-center">
        <svg
          className="loading m-20"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="loadingCircle" cx="50" cy="50" r="45" />
        </svg>
      </div>
    );
  }

  // On Error, do not display feed
  if (error) {
    return null;
  }

  const title = source.title ?? data.feed.title ?? "Title Missing!";

  return (
    <>
      {data && (
        <List
          title={title}
          url={data.feed.link}
          faviconUrl={source.faviconUrl}
          items={data.items.map((item) => ({
            title: item.title,
            url: item.link,
          }))}
        />
      )}
    </>
  );
};

FeedList.propTypes = {
  source: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
      faviconUrl: PropTypes.string,
    })
  ),
};

export default FeedList;
