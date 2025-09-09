import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";

const slideMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: "0%", transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { x: "100%", transition: { duration: 0.3, ease: "easeInOut" } },
};

const Navbar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    return (
        <header className="fixed top-0 left-0 w-full bg-white border-b-1 z-[1000]">
            <div className="max-w-7xl mx-auto px-6 flex justify-evenly max-sm:justify-between max-sm:m-2 items-center h-16 scale-110 ">
                {/* Logo */}
                <a href="/" className="flex items-center">
                    <img src="/logo-light.svg" alt="Logo" className="h-10" />
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-10 font-medium text-black">
                    <a href="/our-work" className="hover:text-pink-500">Work</a>

                    {/* Services Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center hover:text-pink-500">
                            Services <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
                        </button>
                        <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded-lg p-4">
                            <ul className="grid grid-cols-3 gap-6 text-sm min-w-[500px]">
                                <li><a href="/design" className="hover:text-pink-500">Design</a></li>
                                <li><a href="/technology" className="hover:text-pink-500">Technology</a></li>
                                <li><a href="/marketing" className="hover:text-pink-500">Marketing</a></li>
                            </ul>
                        </div>
                    </div>

                    <a href="/clients" className="hover:text-pink-500">Clients</a>

                    {/* About Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center hover:text-pink-500">
                            About <IoIosArrowDown className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
                        </button>
                        <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded-lg p-4">
                            <ul className="grid grid-cols-3 gap-6 text-sm min-w-[500px]">
                                <li><a href="/about/about-us" className="hover:text-pink-500">About Us</a></li>
                                <li><a href="/about/team" className="hover:text-pink-500">Team</a></li>
                                <li><a href="/about/career" className="hover:text-pink-500">Career</a></li>
                            </ul>
                        </div>
                    </div>

                    <a href="/knowledge" className="hover:text-pink-500">Knowledge</a>

                    {/* Contact Button */}
                    <button className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-5 font-medium text-neutral-200 duration-500">
                        <div className="translate-y-0 transition group-hover:-translate-y-[150%]">
                            Contact
                        </div>
                        <div className="absolute translate-y-[150%] transition group-hover:translate-y-0">
                            Contact
                        </div>
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-black text-2xl"
                    onClick={() => setMobileMenu(true)}
                >
                    <FaBars />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        variants={slideMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-0 right-0 h-full w-[70vw] bg-white z-[1000]flex flex-col justify-between p-6"
                    >
                        {/* Header with Close Button */}
                        <div className="flex justify-between items-center">
                            <h4 className="text-red-600 font-bold text-xl">Menu</h4>
                            <button
                                onClick={() => setMobileMenu(false)}
                                className="text-2xl text-black"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Links */}
                        <nav className="mt-10 flex flex-col space-y-4 text-black font-bold text-2xl">
                            <a href="/our-work" onClick={() => setMobileMenu(false)}>Work</a>

                            {/* Services Mobile Dropdown */}
                            <button
                                onClick={() =>
                                    setOpenDropdown(openDropdown === "services" ? null : "services")
                                }
                                className="flex justify-between w-full items-center"
                            >
                                Services{" "}
                                {openDropdown === "services" ? (
                                    <IoIosArrowDown className="transition-transform rotate-180" />
                                ) : (
                                    <GoDotFill className="transition-transform" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openDropdown === "services" && (
                                    <motion.ul
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="ml-4 space-y-2 text-base"
                                    >
                                        <li><a href="/design">Design</a></li>
                                        <li><a href="/technology">Technology</a></li>
                                        <li><a href="/marketing">Marketing</a></li>
                                    </motion.ul>
                                )}
                            </AnimatePresence>

                            <a href="/clients" onClick={() => setMobileMenu(false)}>Clients</a>

                            {/* About Mobile Dropdown */}
                            <button
                                onClick={() =>
                                    setOpenDropdown(openDropdown === "about" ? null : "about")
                                }
                                className="flex justify-between w-full items-center"
                            >
                                About{" "}
                                {openDropdown === "about" ? (
                                    <IoIosArrowDown className="transition-transform rotate-180" />
                                ) : (
                                    <GoDotFill className="transition-transform" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openDropdown === "about" && (
                                    <motion.ul
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="ml-4 space-y-2 text-base"
                                    >
                                        <li><a href="/about/about-us">About Us</a></li>
                                        <li><a href="/about/team">Team</a></li>
                                        <li><a href="/about/career">Career</a></li>
                                    </motion.ul>
                                )}
                            </AnimatePresence>

                            <a href="/knowledge" onClick={() => setMobileMenu(false)}>Knowledge</a>
                        </nav>

                        {/* Footer */}
                        <div className="space-y-4 mt-90 fixed mb-4">
                         <span className="mb-4">
                               <a
                                href="mailto:info@leo9studio.com"
                                className="text-blue-600 underline text-l "
                            >
                                info@leo9studio.com
                            </a>
                         </span>
                            <div className="text-l text-black space-y-2">
                                 <strong className="text-gray-400">IND:</strong>
                                <p className="font-bold"> +91 72081 49788</p>
                                <p className="font-bold">+91 91527 27927</p>
                                <strong className="text-gray-400">USA:</strong>
                                <p className="font-bold"> +1 (802) 347-3690</p>
                            </div>

                            {/* Contact Button */}
                            <button className="group relative inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 duration-500">
                                <div className="translate-y-0 transition group-hover:-translate-y-[150%]">
                                    Contact
                                </div>
                                <div className="absolute translate-y-[150%] transition group-hover:translate-y-0">
                                    Contact
                                </div>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
