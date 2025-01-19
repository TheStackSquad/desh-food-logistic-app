//src/components/Navbar.js
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import navItems from "@/components/objects/uiData";
import { navVariants, menuVariants } from "@/components/motion/dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <div className="header-container fixed top-0 left-0 right-0 z-50">
        <div className="nav-wrapper flex items-center gap-4">
          <Link
            href="/"
            className="logo text-lg font-bold border border-gray-300 rounded-lg px-3 py-1 shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            devKitchen
          </Link>
        </div>

        <div className="icons-container flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-btn text-gray-700 hover:text-gray-900 focus:outline-none focus:ring focus:ring-gray-300"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="menu-icon h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <div className="cart-icon">
            <Link href="/Checkout">
              <FontAwesomeIcon
                icon={faShoppingCart}
                size="lg"
                className="cartIcon text-gray-700 hover:text-gray-900 transition-colors"
              />
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          className="mobile-dropdown bg-white shadow-lg rounded-lg p-4 absolute right-4 top-16 w-64 z-50"
          ref={dropdownRef}
        >
          <motion.div
            variants={navVariants}
            className="mobile-nav-links space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`mobile-nav-link flex items-center justify-start gap-2 text-gray-700 hover:text-blue-500 transition-colors ${
                  pathname === item.path ? "font-bold" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg" style={{ color: item.color }}>
                  {item.icon.dev}
                </span>
                <span>{item.name}</span>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Header;
