import React from "react";
import PropTypes from "prop-types";

import List from "./List";

/**
 * Provides a list of sources which have been defined in advance (ie. Not provided by RSS feed)
 */
const SourceList = ({ source }) => {
  return (
    <>
      {source && (
        <List
          title={source.title}
          url={source.url}
          faviconUrl={source.faviconUrl}
          items={source.links.map((item) => ({
            title: item.title,
            url: item.url,
          }))}
        />
      )}
    </>
  );
};

SourceList.propTypes = {
  source: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    faviconUrl: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  }),
};

export default SourceList;
