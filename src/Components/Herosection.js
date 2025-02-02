import React, { useEffect, useState } from "react";
import { fetchContent } from "../contentfulClient";
import FeatureSection from "./FeatureSection";
import AboutUs from "./AboutUs";
import ContactUs from "./Contact";
import ServicePage from "./Service";
import Latestcasestudy from "./LatestcaseStudies";
import TestimonialSection from "./Testimonial";
import Belowhero from "./Herobottom";
import SecondLateststudy from "./SecondLateststudy";

const HeroSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const content = await fetchContent("contentfulWebsite");

        if (content && content.length > 0) {
          setData(content[0].fields);
        } else {
          setError("No content found");
        }
      } catch (err) {
        setError("Error fetching content: " + err.message);
      } finally {
        setLoading(false);
      }
    };
   
    getData();
  }, []);

  const title = data?.title;
  const description = data?.description;
  const subtitle = data?.suntitle;
  const imageUrl = data?.image?.fields?.file?.url;

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    <>
      <section className="relative w-full custombg  pt-20 pb-16 px-6 md:px-19 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div className="space-y-6">
            <span className=" text-red-500 text-sm tracking-wide">
              -{title}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {subtitle.split(" ").slice(0, 2).join(" ")}{" "}
              <span className="text-red-500 border-b-4 border-red-500 w-1/3 rounded-sm p-1">
                {subtitle.split(" ").slice(2).join(" ")}
              </span>
            </h1>
            <p className="text-gray-600 text-lg">{description}</p>

            <div className="flex space-x-4">
              <button className="custombtnall py-3 px-8  text-lg font-medium  shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                Get Started <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>

          {imageUrl && (
            <div className="relative z-0 ">
              <img
                src={imageUrl}
                alt="Hero"
                className="w-full max-w-xs md:max-w-sm lg:max-w-md shadow-lg ring-4 ring-peach mx-auto md:mx-40 sm:mx-1 "
              />
            </div>
          )}
        </div>
      </section>
      <Belowhero />
      <FeatureSection />
      <AboutUs />
      <ServicePage />
      <Latestcasestudy />
      <TestimonialSection />
      <ContactUs />
      <SecondLateststudy/>
    </>
  );
};

export default HeroSection;
