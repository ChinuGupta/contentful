import React, { useEffect, useState } from "react";
import { fetchContent } from "../contentfulClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCommentDots,
} from "@fortawesome/free-regular-svg-icons";

const PopularPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchContent("popularPosts");
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-6 w-80 mt-40">
      <h2 className="text-xl font-bold mb-7 pb-2 border-b-4 border-red-500 w-1/3 rounded-sm">Popular Posts</h2>
      
      <ul>
        {posts.map((post) => {
          const { title, date, popularpostimg, comments } = post.fields;

          return (
            <li key={post.sys.id} className="flex flex-row mb-10">
              <div className="flex-1">
                <a
                  href={post.fields.link}
                  className="text-sm font-semibold text-gray-800 hover:text-blue-600"
                >
                  {title}
                </a>
                <div className="flex justify-between">
                <span className="text-xs text-gray-500 mt-10 flex ">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="mr-2 text-red-500"
                  />
                  {date}
                </span>
                <sapn className="text-xs text-gray-500 mt-10 ">
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    className="mr-2 text-red-500"
                  />{" "}
                  {comments || 0} Comments
                </sapn>
              </div>
              </div>
              {popularpostimg && (
                <img
                  src={popularpostimg.fields.file.url}
                  alt={title}
                  className="w-16 h-20 object-cover ml-3"
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PopularPosts;
