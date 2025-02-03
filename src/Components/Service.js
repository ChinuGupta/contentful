import React, { useEffect, useState } from "react";
import { fetchContent } from "../contentfulClient";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ServicePage = () => {
  const [content, setContent] = useState(null);
  const [services, setServices] = useState([]);
  const [experience, setExperience] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicePageData = await fetchContent("servicePage");
        const servicesData = await fetchContent("services");
        const experienceData = await fetchContent("experience");

        if (servicePageData && servicePageData.length > 0) {
          setContent(servicePageData[0].fields);
        }
        setServices(servicesData);
        setExperience(experienceData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!content || !services || !experience) {
    return <div>Loading...</div>;
  }

  return (
    <div className="service-page w-full relative">
      <div className="absolute right-0 top-0 w-1/2 h-full bg-blue-500"></div>

      <div className="absolute left-0 top-0 w-1/2 h-full bg-black"></div>
      <div className="max-w-5xl mx-auto px-4 py-10 my-40 relative">
        <div
          className="flex flex-col md:flex-row justify-between items-center mb-10"
          style={{ color: "white", padding: "4rem", borderRadius: "8px" }}
        >
          <div className="md:w-1/2">
            <h1 className="text-red-500 text-sm tracking-wide">
              {content.title}
            </h1>
            <p className="text-3xl text-gray-300 mt-4">{content.description}</p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0 text-right">
            <a
              href={content.buttonLink}
              className="bg-white text-black font-bold py-3 px-6 custom-button-service"
            >
              {content.buttonText}
            </a>
          </div>
        </div>

        <div className="relative">
          <Swiper
            spaceBetween={20}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".swiper-pagination" }}
            modules={[Pagination, Autoplay]}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1200: { slidesPerView: 3 },
            }}
          >
            {services.map((service, index) => (
              <SwiperSlide key={service.sys.id}>
                <div
                  className={`p-6 shadow-md text-center h-full flex flex-col justify-between ${
                    index === 1
                      ? "bg-red-500 text-white"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {service.fields.icon && (
                    <img
                      src={service.fields.icon.fields.file.url}
                      alt="icon"
                      className="w-16 h-16 mx-auto mb-4 filter invert"
                    />
                  )}
                  <h2 className="text-xl font-semibold">
                    {service.fields.title}
                  </h2>
                  <p className="text-gray-300 mt-2 flex-grow">
                    {service.fields.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination absolute -bottom-24 left-0  p-4 flex justify-center space-x-2"></div>
        </div>
      </div>

      <div
        className="max-full mx-auto px-4 py-6 "
        style={{ backgroundColor: "#ede9e1" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {experience.map((exp) => (
            <div key={exp.sys.id} className="text-black text-center">
              <div className="text-black text-4xl font-bold mb-2">
                {exp.fields.numbers}
              </div>
              <p className="text-black text-sm">{exp.fields.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
