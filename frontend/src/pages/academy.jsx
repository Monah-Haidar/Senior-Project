import { useState, useEffect } from "react";
import AcademyVerticalCard from "../components/academy/academyVerticalCard";

function Academy() {
  // State for all articles and filtered articles
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [filter, setFilter] = useState("All"); // Default filter is "All"

  useEffect(() => {
    fetch("http://localhost:3500/articles")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setArticles(data);
        setFilteredArticles(data); // Initially, all articles are displayed
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  const handleFilterClick = (difficulty) => {
    // console.log("hhihihih");
    setFilter(difficulty);
    if (difficulty === "All") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) => article.difficulty === difficulty
      );
      setFilteredArticles(filtered);
    }
  };


  return (
    <>
      <div className=" bg-slate-100 ">
        <div className="">
          {/* <h1 className="text-4xl font-display font-semibold text-base-content mb-6">
            Topics at Academy
          </h1> */}
          {/* <Filters /> */}
        </div>
      </div>

      {/* <div className="bg-base-200 w-full">
        <div className="max-w-[1100px] mx-auto">
          <FilterBar />
        </div>
      </div> */}

      <div className="flex items-center justify-center py-12">
        <div className="mx-6">
          <div className="flex flex-row justify-between mb-8">
            <h2 className="text-3xl font-display font-semibold text-base-content">
              Articles
            </h2>
            <div className="flex gap-2">
              <button
                className={`btn btn-sm rounded-xl ${
                  filter === "All" ? "btn-primary" : ""
                }`}
                onClick={() => handleFilterClick("All")}
              >
                All
              </button>
              <button
                className={`btn btn-sm rounded-xl ${
                  filter === "Beginner" ? "btn-primary" : ""
                }`}
                onClick={() => handleFilterClick("Beginner")}
              >
                Beginner
              </button>
              <button
                className={`btn btn-sm rounded-xl ${
                  filter === "Indermediate" ? "btn-primary" : ""
                }`}
                onClick={() => handleFilterClick("Indermediate")}
              >
                Intermediate
              </button>
              <button
                className={`btn btn-sm rounded-xl ${
                  filter === "Advanced" ? "btn-primary" : ""
                }`}
                onClick={() => handleFilterClick("Advanced")}
              >
                Advanced
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 justify-items-center">
            {filteredArticles.map((article) => (
              <AcademyVerticalCard
                key={article.article_id}
                img={article.img_url}
                alt={article.alt}
                title={article.title}
                body={article.body}
                difficulty={article.difficulty}
                date={article.published_at}
                duration={article.reading_time}
                url={article.article_url}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Academy;
