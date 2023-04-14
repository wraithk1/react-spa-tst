import React from "react";
import { motion } from "framer-motion";
import { useStoreon } from 'storeon/react';


function Card({ item }) {
    const { dispatch, basket } = useStoreon('basket')

    return (
        <div className="rounded-xl cursor-pointer bg-gray-100" key={item.id}>
            <div className="overflow-hidden cursor-default rounded-xl relative group">
                <motion.div
                    initial={{ scale: 1.3, x: 50, opacity: 0 }}
                    animate={{ scale: 1, x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <img src={`/assets/${item.image}`} width={700} height={700} alt='' />
                </motion.div>
                <div className="hidden absolute rounded-xl h-full w-full bg-gray-500 backdrop-filter backdrop-blur-sm bg-opacity-30 top-0 group group-hover:flex justify-center place-items-center z-10">
                    <div className="flex overflow-hidden cursor-pointer">
                        <button
                            onClick={() => dispatch('basket/add', item)}
                            className="p-2 bg-white hover:bg-gray-100 active:bg-gray-200 rounded-lg"
                        >
                            <svg enable-background="new 0 0 50 50" height="30px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="30px" xmlns="http://www.w3.org/2000/svg">
                                <rect fill="none" height="20" width="20" />
                                <line fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="4" x1="9" x2="41" y1="25" y2="25" />
                                <line fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="4" x1="25" x2="25" y1="9" y2="41" />
                            </svg>
                            {/* <i className="text-xl text-black">+</i> */}
                        </button>
                    </div>
                </div>
            </div>

            <div className="px-2 py-2 text-center">
                <p class="text-sm line-clamp-1">{item.title}</p>
                <p class="text-xs my-2 text-gray-400">{item.brand.title}</p>
                <p class="text-sm font-semibold text-cusblack">{item.regular_price?.value} {item.regular_price?.currency}</p>
            </div>
        </div>
    );
}

export default Card;