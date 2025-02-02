import React, { useState } from "react";

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center h-screen p-6">
      <div className="p-6 flex w-3/4">
        <div className="w-1/2 bg text-white p-6 ">
          {submitted ? (
            <div className="text-center text-xl font-semibold text-white-300">
              Thank you for contacting us!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-1xl">-Contact Us</h2>
              <h1 className="text-4xl font-bold">Contact Us For Any Query</h1>
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border-b border-white p-2 outline-none placeholder-white"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border-b border-white p-2 outline-none placeholder-white"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full bg-transparent border-b border-white p-2 outline-none placeholder-white"
                required
              />
              <textarea
                placeholder="Message"
                className="w-full bg-transparent border-b border-white p-2 outline-none placeholder-white h-24"
                required
              ></textarea>
              <button className="custombtnall">
                Submit Now <i className="fas fa-arrow-right"></i>
              </button>
            </form>
          )}
        </div>

        <div className="w-1/2 bg-black flex justify-center items-center p-4 ">
          <iframe
            className="w-full h-full "
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508616!2d144.9630579153154!3d-37.81362797975159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5774b752b62d59b!2sMelbourne%20CBD%2C%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1606109276203!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
