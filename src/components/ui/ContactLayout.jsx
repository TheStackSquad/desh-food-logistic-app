import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Mail, Phone, ChevronRight } from "lucide-react";
import { fadeIn, slideUp } from "@/components/motion/animations";
import ChatWidget from "@/components/chatWidget";


// Image Import & Object
const userImages = {
  user1: { src: "/uploads/contact/user1.webp", alt: "User 1" },
  user2: { src: "/uploads/contact/user2.webp", alt: "User 2" },
  user3: { src: "/uploads/contact/user3.webp", alt: "User 3" },
  user4: { src: "/uploads/contact/user4.webp", alt: "User 4" },
  user5: { src: "/uploads/contact/user5.webp", alt: "User 5" },
  menuBook: { src: "/uploads/contact/menu-book.png", alt: "Menu Book" },
};

const ImageLoader = ({ src, alt, width, height, className }) => (
  <React.Suspense
    fallback={
      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
    }
  >
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  </React.Suspense>
);

const ContactLayout = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const handleChatToggle = () => {
    setIsChatVisible(true);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Live Chat Section */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
          <div className="flex -space-x-2 mb-4">
            {Object.entries(userImages)
              .filter(([key]) => key.startsWith("user"))
              .map(([key, { src, alt }]) => (
                <ImageLoader
                  key={key}
                  src={src}
                  alt={alt}
                  width={50}
                  height={50}
                  className="rounded-full border border-gray-300"
                />
              ))}
          </div>
          <div className="space-y-2 mb-6">
            <p className="text-lg font-medium">Urgently want to reach us?</p>
            <p className="text-gray-600">
              We are available 9 am - 11 pm WAT
              <br />
              Seven days a week. (And we respond within 5 mins!)
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleChatToggle}
            className="w-full flex items-center justify-between bg-blue-600 text-white p-4 rounded-lg"
          >
            <span>Start a conversation</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
          <ChatWidget
            isVisible={isChatVisible}
            onClose={() => setIsChatVisible(false)}
          />
        </motion.div>

        {/* Email Form Section */}
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Email Us</h2>
          <form className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Your name"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Your email address"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                placeholder="Your phone number"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <textarea
              placeholder="Your message"
              rows="4"
              className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Order Section */}
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex flex-col items-center justify-between md:flex-row md:space-x-4">
            <ImageLoader
              src={userImages.menuBook.src}
              alt={userImages.menuBook.alt}
              width={100}
              height={100}
              className="w-20 h-20 object-contain mb-4 md:mb-0"
            />
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Place your order in seconds</h2>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg inline-block mb-2">
                DEV3BTZPT
              </div>
              <p className="text-gray-600 mb-4">
                Get N300 off your first order when you use this promo code!
              </p>
              <Link
                href="/Menu"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
              >
                Order Here
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactLayout;
