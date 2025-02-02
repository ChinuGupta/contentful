import React, { useEffect, useState } from "react";
import { fetchContent } from "../contentfulClient";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const data = await fetchContent("latestCaseStudies");
      const data2 = await fetchContent("images");

      setProjects(data);
      setImages(data2);
    };

    getProjects();
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 flex flex-row mt-40 mx-40">
        <div className="w-1/2 mb-2 ">
          <p className="text-red-500 font-medium">
            -{" "}
            {projects.length > 0
              ? projects[0].fields.title
              : "Latest Case Studies"}
          </p>
          <h1 className="text-3xl font-bold mt-2">
            {projects.length > 0
              ? projects[0].fields.subtitle
              : "Introduce Our Projects"}
          </h1>
          {projects.length > 0 && projects[0].fields.links && (
            <a
              href={projects[0].fields.links}
              className=" custombtnall mt-4 inline px-6 py-2 bg-black text-white  flex items-center"
            >
              View All <i className="fas fa-arrow-right ml-2"></i>
            </a>
          )}
        </div>

        <div className=" w-1/3 grid grid-cols-1 md:grid-cols-1 gap-7 ">
          {projects.map((project) => (
            <div key={project.sys.id} className="shadow-lg overflow-hidden">
              {project.fields.modules && project.fields.modules.length > 0 && (
                <img
                  src={project.fields.modules[0].fields.file.url}
                  alt={project.fields.title}
                  className="w-full h-60 object-cover"
                />
              )}
              <div className="bg-red-500 p-4 text-white flex justify-between items-center">
                <div>
                  <p className="text-sm">{project.fields.subtitle}</p>
                  <h2 className="text-lg font-semibold">
                    {project.fields.title}
                  </h2>
                </div>
                <button className="custombtnall bg-white text-black p-2">
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-row mx-80">
        {images.map((image, index) => (
          <div key={index} className=" flex">
            {image.fields.images &&
              image.fields.images.length > 0 &&
              image.fields.images.map((img, imgIndex) => (
                <img
                  key={imgIndex}
                  src={`https:${img.fields.file.url}`}
                  alt={image.fields.title || "Image"}
                  className={`${
                    imgIndex === 0 ? "w-3/4" : "w-1/4"
                  } h-60 object-cover`}
                />
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Projects;
