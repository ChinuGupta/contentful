import React, { useState, useEffect } from "react";
import { fetchContent } from "../contentfulClient";

const Belowhero = () => {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const getLogos = async () => {
      try {
        const logosFromContentful = await fetchContent("belowhero");
        if (logosFromContentful && Array.isArray(logosFromContentful)) {
          setLogos(logosFromContentful);
        }
      } catch (error) {
        console.error("Error fetching logos:", error);
      }
    };

    getLogos();
  }, []);

  return (
    <section className="py-8 bg-black overflow-hidden relative">
      <div className="w-full mx-auto px-4 flex items-center justify-center relative">
        <div className="flex gap-10 animate-marquee whitespace-nowrap">
          {logos.concat(logos).map((logo, index) => {
            const images = Array.isArray(logo.fields.image)
              ? logo.fields.image
              : [logo.fields.image];

            return images.map((image, imgIndex) =>
              image && image.fields && image.fields.file ? (
                <img
                  key={`${image.sys?.id || index}-${imgIndex}`}
                  src={image.fields.file.url}
                  alt={logo.fields.title || "Logo"}
                  className="h-10 w-auto object-contain filter invert brightness-0 mx-5"
                />
              ) : null
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Belowhero;
