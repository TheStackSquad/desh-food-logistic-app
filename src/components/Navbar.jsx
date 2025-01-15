//src/compponents/Navbar.js
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import navItems from "@/components/objects/uiData";
import { navVariants, menuVariants } from "@/components/motion/dropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "@/styles/componentStyle/Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null); // Reference to the dropdown

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="header">
      <div className="nav-container">
        {/* Logo and top navigation wrapper */}
        <div className="nav-wrapper">
          <Link href="/" className="logo">
            devKitchen
          </Link>

          {/* Icons container for mobile menu and cart */}
          <div className="icons-container">
            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="menu-icon"
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
            {/* Shopping cart link */}
            <div className="cart-icon">
              <Link href="/Checkout">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  size="20px"
                  style={{ cursor: "pointer" }}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu with animation */}
        <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          className="mobile-dropdown"
          ref={dropdownRef} // Attach the ref to the dropdown
        >
          <motion.div variants={navVariants} className="mobile-nav-links">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`mobile-nav-link ${
                  pathname === item.path ? "active" : ""
                }`}
                onClick={() => setIsOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span
                  style={{
                    color: item.color,
                    fontSize: "20px",
                    marginRight: "8px",
                  }}
                >
                  <Image
                    src={item.icon.dev}
                    alt={`${item.name} icon`}
                    width={20}
                    height={20}
                  />
                </span>
                <span>{item.name}</span>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
