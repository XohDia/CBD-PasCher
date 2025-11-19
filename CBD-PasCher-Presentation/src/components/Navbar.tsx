import React, { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { title: "Home", link: "#home" },
    { title: "About", link: "#about" },
    { title: "Projects", link: "#projects" },
    { title: "Services", link: "#services" },
    { title: "Contact", link: "#contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 p-4 fixed w-full top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-white font-bold text-2xl tracking-wider hover:text-purple-200 transition-all duration-300">UIBYTEJAS</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="text-white hover:text-purple-200 transition duration-300 ease-in-out text-lg relative group"
              >
                {item.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full font-semibold hover:bg-white/20 transition duration-300 ease-in-out border border-white/20"
            >
              <FaUserCircle className="h-5 w-5" />
              <span>{isLoggedIn ? "Sign Out" : "Login"}</span>
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-2"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden backdrop-blur-lg bg-purple-600/90 rounded-lg mt-4 shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition duration-300 ease-in-out"
                >
                  {item.title}
                </a>
              ))}
              <button
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className="w-full flex items-center justify-center space-x-2 bg-white/10 text-white px-6 py-2 rounded-full font-semibold hover:bg-white/20 transition duration-300 ease-in-out mt-4 border border-white/20"
              >
                <FaUserCircle className="h-5 w-5" />
                <span>{isLoggedIn ? "Sign Out" : "Login"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;