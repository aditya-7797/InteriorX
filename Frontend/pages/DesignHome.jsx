import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import HeroPng from '../src/assets/images/hero.png'; // Using this as DesignHeroPng
import DesignerNavbar from '../components/designerNavbar.jsx';
import { SlideUp } from '../src/animation/animate';

function DesignHome() {
    return (
        <>
            {/* Designer Navbar */}
            <DesignerNavbar />

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
                            Hello, {localStorage.getItem("user_email")}
                        </motion.h1>
                        <motion.p
                            variants={SlideUp(0.5)}
                            initial="initial"
                            animate="animate"
                            className="text-sm md:text-base text-gray-500 leading-7"
                        >
                            Start designing beautiful spaces tailored for your clients. Collaborate, create, and inspire with tools made just for designers.
                        </motion.p>
                        <div className="space-x-4">
                            <motion.button
                                variants={SlideUp(0.8)}
                                initial="initial"
                                animate="animate"
                                className="primary-btn uppercase bg-indigo-600 text-white shadow-[5px_5px_0px_0px_#4b4b4b]"
                            >
                                Start Designing
                            </motion.button>
                            <motion.button
                                variants={SlideUp(1.1)}
                                initial="initial"
                                animate="animate"
                                className="primary-btn uppercase"
                            >
                                Explore Projects
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
                            alt="Design Hero"
                            className="w-[80%] md:w-[700px] object-cover"
                        />
                    </div>

                </div>
            </div>
        </>
    );
}

export default DesignHome;
