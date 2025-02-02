import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchContent } from "../contentfulClient";
import "../App.css";

const Navbar = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetchContent("menuItems");

        const navbarData = response.map((item) => item.fields);

        const priorityOrder = ["Home", "Blog", "Services"];

        const sortedMenu = navbarData.sort((a, b) => {
          const indexA = priorityOrder.indexOf(a.title);
          const indexB = priorityOrder.indexOf(b.title);
          return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
        });

        setMenuItems(sortedMenu);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const handleDropdownToggle = (id) => {
    setOpenDropdown((prevId) => (prevId === id ? null : id));
  };

  return (
    <nav className="custombg p-4 relative z-20 sticky  sticky top-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex items-center">
        <Link to="/" className="text-xl font-bold text-black mr-8">
          Fenet
        </Link>

        {loading ? (
          <p className="text-black">Loading menu...</p>
        ) : (
          <ul className="flex space-x-8 mx-20">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative group"
                onMouseEnter={() =>
                  item.submenuItems && handleDropdownToggle(index)
                }
                onMouseLeave={() => handleDropdownToggle(null)}
              >
                <Link
                  to={item.slug}
                  className="text-black hover:text-gray-600 cursor-pointer"
                >
                  {item.title}
                </Link>

                {openDropdown === index &&
                  item.submenuItems &&
                  item.submenuItems.length > 0 && (
                    <ul
                      className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-48 p-2 z-30"
                      onMouseEnter={() => handleDropdownToggle(index)}
                      onMouseLeave={() => handleDropdownToggle(null)}
                    >
                      {item.submenuItems.map((submenuItem) => (
                        <li key={submenuItem.sys.id}>
                          <Link
                            to={submenuItem.fields.slug}
                            className="block px-4 py-2 text-black hover:bg-gray-100"
                          >
                            {submenuItem.fields.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        )}

        <div className="ml-auto border-2 border-black px-4 py-2">
          <Link to="/contact" className="px-4 py-2 text-black">
            Contact Us <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
