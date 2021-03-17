import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { useLocation, useHistory } from "react-router-dom";

import "./App.css";
import FeedList from "./components/FeedList";
import SourceList from "./components/SourceList";
import { useQuery } from "react-query";
import { DB } from "./services/firebase";

function App() {
  const location = useLocation();
  const history = useHistory();

  const [selectedCategory, setSelectedCategory] = useState("Technology");

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

  const changeCategory = (event) => {
    history.push(`/?category=${event.target.value}`);
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    let params = new URLSearchParams(location.search);
    const category = params.get("category") ?? "Technology";
    setSelectedCategory(category);
  }, [location]);

  return (
    <div className="container mx-auto">
      {data && (
        <>
          <h1 className="text-4xl my-5">{selectedCategory}</h1>

          <select onChange={changeCategory} value={""}>
            <option disabled default value={""}>
              Change category...
            </option>
            {data.map((category) => (
              <option value={category.name} key={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <div>
            <Masonry
              breakpointCols={breakpointColumns}
              className="flex gap-10"
              columnClassName="" // Required
            >
              {data
                .find((d) => d.name === selectedCategory)
                .sources.map((source) => {
                  // Switch output depending on the type of source provided
                  switch (source.type) {
                    case 0:
                      return <FeedList key={source.url} source={source} />;
                    case 1:
                      return <SourceList key={source.url} source={source} />;
                    default:
                      return null;
                  }
                })}
            </Masonry>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
