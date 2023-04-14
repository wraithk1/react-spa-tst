import React from "react";
import { useNavigate } from 'react-router'
import { useStoreon } from 'storeon/react';


function Header() {
    const navigate = useNavigate();
    const {dispatch, basket} = useStoreon('basket')

    return (
        <nav className="w-full mx-auto fixed z-30 py-2 top-0 md:px-0 duration-200 bg-white">
            <div className="px-2 navtop relative max-w-6xl mx-auto flex justify-between place-items-center py-1.5">
                {/*  title  */}
                <h3 className="uppercase md:inline text-md mr-2 font-semibold ml-3 text-cusblack cursor-pointer" onClick={() => navigate('/')}>
                    products
                </h3>


                {/* basket */}
                <div
                    onClick={() => navigate("/basket")}
                    className="w-8 relative flex items-center h-8 mr-1 rounded-full hover:bg-gray-200 active:bg-gray-300 cursor-pointer duration-200"
                >
                    <svg
                        className="w-6 h-6 text-cusblack m-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                    {basket?.length > 0 && (
                        <div
                            className={`flex absolute text-xs font-light justify-center text-white text-center w-4 h-4 bg-gray-900 rounded-full bottom-0 right-0`}
                        >
                            {basket.reduce((a, item) => a + item.quantity, 0)}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;