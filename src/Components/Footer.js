import { useEffect, useState } from "react";
import { fetchContent } from "../contentfulClient";
export default function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const footerItems = await fetchContent("footer");
        if (footerItems.length > 0) {
          setFooterData(footerItems[0].fields);
        }
      } catch (error) {
        console.error("Error fetching footer:", error);
      }
    };

    fetchFooter();
  }, []);

  if (!footerData) return <div>Loading footer...</div>;

  return (
    <footer className="bg-[#0c0d10] text-white py-12 px-6 md:px-16 bg-black mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-10 ">
          <h2 className="text-xl font-semibold mt-4">
            {footerData.newsletterTitle}
          </h2>

          <div className="flex justify-center mt-4">
            <input
              type="email"
              placeholder={footerData.newsletterPlaceholder}
              className="w-72 p-2 bg-gray-800 text-white border border-gray-700 focus:outline-none"
            />
            <button className="bg-red-500 px-4 py-2  hover:bg-red-600">
              {footerData.subscribeButtonText}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold">
              <span className="text-red-500 text-4xl">•</span>
              {footerData.companyName}
            </h3>
            <p className="text-gray-400 mt-2">{footerData.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mx-20">Company</h3>
            <ul className="mt-2 space-y-2 mx-20">
              {footerData.companyLinks?.map((link, index) => (
                <li key={index}>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold">Instagram</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {footerData.instagramImages?.map((img, index) => (
                <img
                  key={index}
                  src={img.fields.file.url}
                  alt={`Instagram ${index + 1}`}
                  className="w-full h-16 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <p>{footerData.footerNote}</p>
          <div className="flex space-x-3">
            {footerData.socialMediaLinks?.map((link, index) => (
              <a key={index} href={link} className="hover:text-white">
                <i
                  className={`fab fa-${
                    link.includes("facebook")
                      ? "facebook"
                      : link.includes("twitter")
                      ? "twitter"
                      : "linkedin"
                  }`}
                ></i>
              </a>
            ))}
          </div>
          <div className="flex space-x-4">
            {footerData.legalLink?.map((link, index) => (
              <a key={index} href="/" className="hover:text-white transition">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
