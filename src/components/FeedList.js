import React, { useState } from "react";
import { useQuery } from "react-query";
import he from "he";

import "./FeedList.css";
import { fetchFeed } from "../data/FeedAPI";

const List = ({ source }) => {
  // Fetch data
  const { isLoading, error, data } = useQuery(
    source.url,
    async () => await fetchFeed(source),
    {
      staleTime: 3_600_000,
    }
  );
  // Image controls - some favicons may not be accessible due to CORS
  const [showImage, setShowImage] = useState(false);

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

  const title = source.title ?? data.feed.title;

  return (
    <>
      {data && (
        <div className="my-10 divide-y rounded-xl shadow-lg border">
          <div className="pl-5 py-2 text-lg flex items-center">
            <img
              src={source.faviconUrl}
              className={`h-5 w-5 mr-2 ${showImage ? "inline" : "hidden"}`}
              alt={`${title} icon`}
              onLoad={() => setShowImage(true)}
              onError={(i) => setShowImage(false)}
            />
            <a
              className="font-bold"
              href={data.feed.link}
              target="_blank"
              rel="noopener noreferrer"
              dangerouslySetInnerHTML={{
                __html: he.decode(title),
              }}
            />
          </div>

          <div className="px-5 py-2">
            {data &&
              data.items.map((item) => (
                <div
                  key={item.title}
                  className="text-sm py-2 border-b last:border-b-0 hover:bg-gray-100 flex cursor-pointer"
                >
                  <a
                    className="w-full h-full text-black visited:text-purple-600"
                    dangerouslySetInnerHTML={{ __html: he.decode(item.title) }}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default List;
