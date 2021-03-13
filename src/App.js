import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";

import "./App.css";
import FeedList from "./components/FeedList";
import SourceCategory from "./utils/SourceCategory";
import { useQuery } from "react-query";
import { DB } from "./services/firebase";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(
    SourceCategory.Technology
  );
  const [categoryText, setCategoryText] = useState(
    getSourceNameByValue(SourceCategory, selectedCategory)
  );

  const { data } = useQuery(
    "sources",
    async () =>
      await DB.collection("categories")
        .get()
        .then((querySnapshot) => {
          return querySnapshot.docs.map((doc) => doc.data());
        }),
    {
      staleTime: 3_600_000,
    }
  );

  const breakpointColumns = {
    default: 3,
    1000: 2,
    500: 1,
  };

  function getSourceNameByValue(value) {
    return Object.keys(SourceCategory).find(
      (key) => SourceCategory[key] === Number.parseInt(value)
    );
  }

  const changeCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    setCategoryText(getSourceNameByValue(selectedCategory));
  }, [selectedCategory]);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl my-5">{categoryText}</h1>

      <select onChange={changeCategory} value={-1}>
        <option disabled default value={-1}>
          Change category...
        </option>
        {Object.entries(SourceCategory).map(([key, value]) => (
          <option value={value} key={key}>
            {key}
          </option>
        ))}
      </select>

      {data && (
        <div>
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex gap-10"
            columnClassName="" // Required
          >
            {data
              .find((d) => d.name === getSourceNameByValue(selectedCategory))
              .sources.map((source) => (
                <FeedList key={source.url} source={source} />
              ))}
          </Masonry>
        </div>
      )}
    </div>
  );
}

export default App;
