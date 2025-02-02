import React, { useEffect, useState } from "react";
import { fetchContent } from "../contentfulClient";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const LatestNews = () => {
  const [newsSection, setNewsSection] = useState(null);
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const sectionData = await fetchContent("secondLatestStudy");
      const articlesData = await fetchContent("newsartical");
      setNewsSection(sectionData[0]);
      setNewsArticles(articlesData);
    };

    getNews();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {newsSection && (
        <div className="flex justify-between items-center">
          <div>
            <p className="text-red-500 font-medium">- {newsSection.fields.title}</p>
            <h1 className="text-3xl font-bold mt-2">{newsSection.fields.subheading}</h1>
          </div>
          <a
            href={newsSection.fields.buttonurl}
            className="border border-black px-6 py-2 text-black flex items-center transition custombtnall "
          >
            {newsSection.fields.links} <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      )}

      <Swiper
        modules={[Pagination, Autoplay]} 
        spaceBetween={30}
        slidesPerView={3}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mt-10 pb-12 "
      >
        {newsArticles.map((article) => (
          <SwiperSlide key={article.sys.id} className="bg-white shadow-lg overflow-hidden relative">
            <div className="relative">
              <img
                src={article.fields.image.fields.file.url}
                alt={article.fields.title}
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 text-sm font-semibold">
                {article.fields.category}
              </span>
            </div>
            <div className="p-4">
              <h2 className="mt-2 font-semibold text-lg">{article.fields.title}</h2>
              <a href={article.fields.readMore} className="text-blue-600 mt-2 inline-block">
                {"--"}Learn More
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LatestNews;
