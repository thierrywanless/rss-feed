import React, { useState } from "react";
import PropTypes from "prop-types";
import he from "he";

const List = ({ title, url, faviconUrl = null, items }) => {
  // Image controls - in case image is not available
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      <div className="my-10 divide-y rounded-xl shadow-lg border">
        <div className="pl-5 py-2 text-lg flex items-center">
          {faviconUrl && (
            <img
              src={faviconUrl}
              className={`h-5 w-5 mr-2 ${showImage ? "inline" : "hidden"}`}
              alt={`${title} icon`}
              onLoad={() => setShowImage(true)}
              onError={(i) => setShowImage(false)}
            />
          )}

          <a
            className="font-bold"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            dangerouslySetInnerHTML={{
              __html: he.decode(title),
            }}
          />
        </div>

        <div className="px-5 py-2">
          {items &&
            items.map((item) => (
              <div
                key={item.title}
                className="text-sm py-2 border-b last:border-b-0 hover:bg-gray-100 flex cursor-pointer"
              >
                <a
                  className="w-full h-full text-black visited:text-purple-600"
                  dangerouslySetInnerHTML={{ __html: he.decode(item.title) }}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

List.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  faviconUrl: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default List;
