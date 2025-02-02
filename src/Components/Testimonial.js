import React, { useState, useEffect } from "react";
import { fetchContent } from "../contentfulClient";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useEffect(() => {
    const getTestimonials = async () => {
      const testimonialsFromContentful = await fetchContent("testimonial");
      if (testimonialsFromContentful) {
        setTestimonials(testimonialsFromContentful);
      }
    };

    getTestimonials();
  }, []);

  const currentTestimonial = testimonials[currentTestimonialIndex];

  const goToPrevious = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentTestimonialIndex((nextIndex) =>
      nextIndex === testimonials.length - 1 ? 0 : nextIndex + 1
    );
  };

  if (!currentTestimonial) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="py-12 mt-20">
        <div className="max-w-3xl mx-auto px-4 relative">
          <div className="flex items-start justify-between">
            <div className="relative w-1/2 mb-20">
              {currentTestimonial.fields.photo && (
                <img
                  src={currentTestimonial.fields.photo.fields.file.url}
                  alt={currentTestimonial.fields.name}
                  className="w-full h-auto object-cover custom-shadow"
                  style={{ border: "2px solid #EF4444" }}
                />
              )}
              <div className="mt-10">
                <h3 className="text-xl font-medium text-gray-800">
                  {currentTestimonial.fields.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {currentTestimonial.fields.role}
                </p>
              </div>
            </div>

            <div className="w-2/3 pl-8 mt-20">
              <p className="text-gray-800 leading-relaxed mb-4">
                "{currentTestimonial.fields.testimonialText}"
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-4 w-full flex justify-center mt-30 gap-6">
            <button
              onClick={goToPrevious}
              className="bg-gray-200 rounded-full p-2 hover:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="bg-gray-200 rounded-full p-2 hover:bg-gray-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
      <div
        className=" mx-40 w-3/4 mt-2 h-px bg-black "
      ></div>{" "}
    </>
  );
};

export default TestimonialSection;
