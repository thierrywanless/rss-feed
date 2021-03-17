import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import { useLocation, useHistory } from "react-router-dom";
import Particles from "react-particles-js";

import "./App.css";
import FeedList from "./components/FeedList";
import SourceList from "./components/SourceList";
import { useQuery } from "react-query";
import { DB } from "./services/firebase";
import { useCookies } from "react-cookie";

function App() {
  const location = useLocation();
  const history = useHistory();

  // Store selected category in a cookie
  const [cookie, setCookie] = useCookies(["category"]);

  // Get feed/sources
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

  // New category selected -> Update query and cookie
  const changeCategory = (event) => {
    history.push(`/?category=${event.target.value}`);
    setCookie("category", event.target.value);
  };

  // On location change -> Update category
  useEffect(() => {
    let params = new URLSearchParams(location.search);
    const category = params.get("category") ?? cookie.category ?? "Technology";
    setCookie("category", category);
  }, [location, setCookie, cookie]);

  // Masonry column configuration for responsive layouts
  const breakpointColumns = {
    default: 3,
    1000: 2,
    500: 1,
  };

  return (
    <div className="min-h-screen h-full">
      <Particles
        canvasClassName="absolute top-0 left-0 -z-100 bg-black "
        params={{
          particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: { enable: false },
            },
            size: {
              value: 3,
              random: true,
              anim: { enable: false },
            },
            line_linked: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: false },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: false },
              onclick: { enable: false },
              resize: true,
            },
          },
          retina_detect: true,
        }}
      />
      {data && (
        <div className="container mx-auto p-5 z-50">
          <h1 className="text-4xl mb-5">{cookie.category}</h1>

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
            {data.find((d) => d.name === cookie.category) ? (
              <Masonry
                breakpointCols={breakpointColumns}
                className="flex gap-10"
                columnClassName="" // Required
              >
                {data
                  .find((d) => d.name === cookie.category)
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
            ) : (
              <div className="mt-10 text-2xl">
                Looks like we don't have that category! Try selecting another!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
