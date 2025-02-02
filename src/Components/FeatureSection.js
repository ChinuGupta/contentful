import React, { useState, useEffect } from "react";
import { fetchContent } from "../contentfulClient";

const FeatureSection = () => {
  const [featureData, setFeatureData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeatureData = async () => {
      try {
        const data = await fetchContent("featureSection");
        if (data.length > 0) {
          setFeatureData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching feature section:", error);
      } finally {
        setLoading(false);
      }
    };

    getFeatureData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!featureData) return <p>No content available</p>;

  return (
    
    <section className="container mx-auto py-40">
      <div className="mx-40">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-4xl font-bold">{featureData.fields.title}</h2>
          <p className="text-gray-500 mt-4">{featureData.fields.description}</p>
        </div>
        <div className="overflow-x-auto flex space-x-6 mt-20 scrollbar-hide">
          {featureData.fields.features.map((feature, index) => (
            <div
              key={feature.sys.id}
              className="min-w-[10px] h-200 p-8 shadow-lg border-2  border-black"
              style={{
                backgroundColor:
                  index === 1 ? "#007bff" : index === 2 ? "#000" : "#fff",
                color: index >= 1 ? "#fff" : "#000",
                
              }}
            >
              <img
                src={feature.fields.icon.fields.file.url}
                alt={feature.fields.title + " icon"}
                className={`w-12 mb-4 ${index === 2 ? "filter invert" : ""}`}
              />
              <h3 className="text-lg font-bold">{feature.fields.title}</h3>
              <p
                className="text-gray-500 text-sm"
                style={{
                  color:
                    index === 1 ? "white" : index === 2 ? "white" : "black",
                }}
              >
                {feature.fields.description}
              </p>
              <button class="custom-button">
                Read More <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
