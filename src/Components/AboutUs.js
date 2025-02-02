import React, { useEffect, useState } from "react";
import { fetchContent } from "../contentfulClient";

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const getAboutData = async () => {
      const data = await fetchContent("about");
      if (data.length > 0) {
        setAboutData(data[0].fields);
      }
    };

    getAboutData();
  }, []);

  if (!aboutData) return <p className="text-center text-lg">Loading...</p>;

  return (
    <section className="max-w-7xl mx-auto px-5 mt-20 pb-16 flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 flex justify-center ">
        <img
          src={aboutData.image.fields.file.url}
          alt="About Us"
          className="w-full max-w-md shadow-lg aboutshadow"
        />
      </div>

      <div className="w-full md:w-1/2 md:pl-10 mt-10 md:mt-0">
        <p className="text-red-500 text-sm tracking-wide">-{aboutData.title}</p>
        <h2 className="text-4xl font-bold mt-4">{aboutData.subtitle}</h2>
        <p className="text-gray-600 mt-4 leading-relaxed">{aboutData.description}</p>

        <button className=" custombtnall mt-6 px-6 py-3 bg-black text-white font-semibold flex items-center gap-2 transform hover:scale-105 transition-all duration-300">
          Learn More <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </section>
  );
};

export default About;
