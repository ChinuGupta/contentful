import React, { useState, useEffect } from "react";
import { fetchContent } from "../contentfulClient";
import LatestArticles from "./LatestArtical";
const Blog = () => {
  const [featureData, setFeatureData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const heroData = await fetchContent("blogHero");
        
          setFeatureData(heroData[0].fields);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600 py-4">Loading...</div>;
  }

  if (!featureData) {
    return (
      <div className="text-center text-gray-600 py-4">No data available.</div>
    );
  }

  return (
    <>
    <div className="custombg py-12 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-red-500 mt-4">-{featureData.title}</h2>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {featureData.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {featureData.cards.map((card) => (
            <div
              key={card.sys.id}
              className="relative group bg-opacity-50"
              style={{ aspectRatio: "4/3" }}
            >
              {" "}
              <img
                src={card.fields.file.url}
                alt={card.fields.title}
                className="w-full h-full object-cover transition duration-300 ease-in-out"
              />
              <div className="absolute inset-0 flex items-center justify-center transition duration-300 ease-in-out bg-black bg-opacity-0 group-hover:bg-opacity-50">
                {" "}
                <h3 className="text-white font-medium text-lg p-4 rounded">
                  {card.fields.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <LatestArticles/>
   </>
  );
};

export default Blog;
