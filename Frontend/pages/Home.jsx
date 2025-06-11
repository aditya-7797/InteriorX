import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
// import Navbar from '../components/Navbar';
import StylePopup from "../components/StylePopup";
// import bg from "../src/assets/images/bg.jpeg";
import HeroPng from '../src/assets/images/hero.png';
import { SlideUp } from '../src/animation/animate';
import Navbar from '../components/Navbar';

function Home() {
    console.log("Home Component Loaded");

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const hasSubmitted = localStorage.getItem("preferencesSubmitted");
        const shouldShowPopup = localStorage.getItem("showStylePopup");

        if (shouldShowPopup === "true" && !hasSubmitted) {
            setShowPopup(true);
            localStorage.removeItem("showStylePopup");
        }
    }, []);

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    return (
        <>
            <Navbar />

            {/* Popup */}
            {showPopup && (
                <div className="absolute top-10 right-10 z-50">
                    <StylePopup onClose={handlePopupClose} />
                </div>
            )}

            {/* Hero Section */}
            <div className="container relative min-h-screen p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[600px] gap-10">
                    
                    {/* Text section */}
                    <div className="flex flex-col justify-center gap-7 md:pr-8 xl:pr-52 text-center md:text-left pt-20 md:pt-0 px-10">
                        <motion.h1
                            variants={SlideUp(0.2)}
                            initial="initial"
                            animate="animate"
                            className="text-4xl font-bold font-serif"
                        >
                            AI-DRIVEN INTERIOR DESIGN
                        </motion.h1>
                        <motion.p
                            variants={SlideUp(0.5)}
                            initial="initial"
                            animate="animate"
                            className="text-sm md:text-base text-gray-500 leading-7"
                        >
                            Bring your dream to life with one-on-one design help & hand-picked
                            products tailored to your style, space, and budget.
                        </motion.p>
                        <div className="space-x-4">
                            <motion.button
                                variants={SlideUp(0.8)}
                                initial="initial"
                                animate="animate"
                                className="primary-btn uppercase bg-black text-white shadow-[5px_5px_0px_0px_#6c6c6c]"
                            >
                                Get started
                            </motion.button>
                            <motion.button
                                variants={SlideUp(1.1)}
                                initial="initial"
                                animate="animate"
                                className="primary-btn uppercase"
                            >
                                Contact Us
                            </motion.button>
                        </div>
                    </div>

                    {/* Images section */}
                    <div className="flex flex-col items-center justify-center">
                        <motion.img
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            src={HeroPng}
                            alt="Hero"
                            className="w-[80%] md:w-[700px] object-cover"
                        />
                    </div>

                </div>

             
            </div>
        </>
    );
}

export default Home;
