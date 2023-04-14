import React from "react";


function Loader(){
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col">
                <div className="w-24 h-24 rounded-[50%] border-8 border-x-black border-y-transparent animate-spin"></div>
                <span className="text-2xl text-black mt-2">loading...</span>
            </div>
        </div>
    );
}

export default Loader;