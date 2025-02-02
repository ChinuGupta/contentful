import React, { useEffect, useState } from "react";
import { fetchContent } from "../contentfulClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";
import PopularPost from "./PopularPost";

const LatestArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      const data = await fetchContent("latestArticles");
      console.log("Received Articles:", data);
      const formattedArticles = data.map((item) => ({
        id: item.sys.id,
        title: item.fields.title,
        date: item.fields.date,
        commentsCount: item.fields.comment || 0,
        description: item.fields.description,
        imageUrl: item.fields.thumbnailImage?.fields?.file?.url,
        readMoreLink: item.fields.readMoreLink,
      }));
      setArticles(formattedArticles);
      setLoading(false);
    };

    getArticles();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading articles...</p>;
  }

  return (
    <div className="flex ">
      <div className="w-1/2 mx-40 font-sans mt-40 mb-20">
        <h2 className="text-3xl font-bold mb-7 pb-10 border-b border-gray-400">
          Latest Articles
        </h2>

        {articles.map((article) => (
          <div
            key={article.id}
            className="flex flex-col md:flex-row items-center border-b pb-6 mb-6"
          >
            <div className="md:flex-1 md:pr-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="mr-2 text-red-500"
                />
                <span>{article.date}</span>
                <span className="ml-4">
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    className="mr-2 text-red-500"
                  />
                  <span>{article.commentsCount}Comments</span>
                </span>
              </p>
              <p className="text-gray-700 mt-2">{article.description}</p>
              <a
                href={article.readMoreLink}
                className="text-red-600 font-semibold mt-3 inline-block hover:underline"
              >
                Read More
              </a>
            </div>
            {article.imageUrl && (
              <div className="w-36 h-24 md:w-48 md:h-32 flex-shrink-0 mt-4 md:mt-0">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover "
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <PopularPost />
    </div>
  );
};

export default LatestArticles;
