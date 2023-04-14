import React from "react";
import { useStoreon } from "storeon/react";
import { motion } from "framer-motion";


function BasketCard({ item, idx }) {
    const { dispatch, basket } = useStoreon('basket')

    return (
        <div
            className="product md:flex justify-between mb-6"
            suppressHydrationWarning
        >
            <div className="image md:flex cursor-pointer">
                <motion.div
                    initial={{ scale: 1.5, x: 50, y: -50, opacity: 0 }}
                    animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                >
                    <img
                        className="w-full md:w-32 h-32 object-cover rounded-xl"
                        src={`/assets/${item.image}`} //item.prop[0].image[0]
                        alt=""
                    />
                </motion.div>
                <div className="ml-3 flex flex-col text-cusblack justify-between py-2">
                    <p className="font-medium">{item.title}</p>
                    <ul className="text-xs md:text-sm leading-relaxed text-gray-400">
                        <li>Название: {item.title}</li>
                        <li>Бренд: {item.brand.title}</li>
                        <li>Количество: {item.quantity}</li>
                        <li>Тип: {item.type}</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col justify-between py-1">
                {item.regular_price.value} {item.regular_price.currency}
                <div className="flex ml-auto text-cusblack mt-1 md:mt-0">
                    <button
                        onClick={() => {
                            if (item.quantity > 1) dispatch('basket/minus', idx);
                        }}
                        className="border border-cusblack active:bg-gray-800 rounded-sm p-1 hover:bg-cusblack hover:text-white duration-100"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() => dispatch('basket/plus', idx)}
                        className="border border-cusblack active:bg-gray-800 rounded-sm p-1 hover:bg-cusblack hover:text-white duration-100 mx-1"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() => dispatch('basket/remove', item)}
                        className="border border-cusblack active:bg-gray-800 rounded-sm p-1 hover:bg-cusblack hover:text-white duration-100 text-xs px-2 font-medium"
                    >
                        УДАЛИТЬ
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BasketCard;