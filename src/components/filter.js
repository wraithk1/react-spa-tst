import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { isMobile } from 'react-device-detect';
import brands from '../data/brands.json'

import { motion, useReducedMotion } from "framer-motion";
import { flushSync } from "react-dom";

import {useStoreon} from 'storeon/react';


function Desktop() {
    const {dispatch, products, pagination} = useStoreon('products', 'pagination')
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        const value = Object.values(data).filter(itm => !!itm)
        dispatch('products/filter', value)
        dispatch('pagination/clear')
        console.log(value)
    }

    const onReset = () => {
        dispatch('products/clear')
        dispatch('pagination/clear')
        reset()
    }

    return (
        <div className='hidden lg:static lg:inline h-screen bg-opacity-30 z-20 w-full justify-center place-items-center top-0 lg:p-4'>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl px-5 py-6 shadow-lg w-2/3 md:w-1/2 lg:w-auto flex flex-col">
                <h5 className="font-bold text-teal-950 mb-3">Бренды</h5>

                {brands.map(brand => (
                    <>
                        <input
                            {...register(brand.title)}
                            type="checkbox"
                            value={brand.title}
                            id={brand.title}
                            className="custom-checkbox"
                            key={brand.id}
                        />
                        <label htmlFor={brand.title}>{brand.title}</label>
                    </>
                ))}

                <input className="mt-16 w-full h-14 rounded-2xl text-base text-white bg-teal-600 hover:bg-teal-900 cursor-pointer" value='применить' type="submit" />
                <input
                    className="mt-2 w-full h-14 rounded-2xl text-base text-teal-600 underline hover:text-teal-900 cursor-pointer"
                    value='&#x2715; сбросить'
                    type="button"
                    onClick={onReset}
                />
            </form>

        </div>
    );
}

function Mobile() {
    const {dispatch, products, pagination} = useStoreon('products', 'pagination')

    const { register, handleSubmit, reset } = useForm();
    const [open, setOpen] = useState(false);
    const reducedMotion = useReducedMotion();
    const [currentAnimation, setCurrentAnimation] = useState();

    const onSubmit = (data) => {
        const value = Object.values(data).filter(itm => !!itm)
        dispatch('products/filter', value)
        dispatch('pagination/clear')
        console.log(value)
    }

    const onReset = () => {
        dispatch('products/clear')
        dispatch('pagination/clear')
        reset()
    }

    return (
        <div className='col-span-4 bg-opacity-30 w-full justify-center place-items-center p-4'>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-3xl px-5 py-6 shadow-lg w-full flex flex-col justify-center"
            >
                <h5 className="font-bold text-teal-950 cursor-pointer" onClick={() => setOpen(!open)}>
                    Бренды
                    {open
                        ? <i className="arrow up ml-1 mt-1"></i>
                        : <i className="arrow down ml-1 mb-1"></i>}
                </h5>

                <motion.div
                    animate={open ? "open" : "closed"}
                    variants={{
                        closed: reducedMotion ? { opacity: 0, height: 0 } : { scale: 0, height: 0 },
                        open: reducedMotion
                            ? { opacity: 1 }
                            : {
                                scale: 1,
                                height: 'auto',
                                transition: {
                                    type: "spring",
                                    duration: 0.4,
                                    delayChildren: 0.2,
                                    staggerChildren: 0.05,
                                },
                            },
                    }}
                    onAnimationStart={(animation) => {
                        flushSync(() => setCurrentAnimation(animation));
                    }}
                    onAnimationComplete={(animation) => {
                        if (currentAnimation !== animation) return;
                        //if (!menu.getState().animating) return;
                        //menu.stopAnimation();
                    }}
                >
                    {brands.map((brand, idx) => (
                        <motion.div
                            animate={open ? "open" : "closed"}
                            {...reducedMotion
                                ? {}
                                : {
                                    transition: {
                                        opacity: { duration: parseFloat('0.5' + idx) },
                                        x: { duration: parseFloat('0.5' + idx) }
                                    },
                                    variants: {
                                        closed: { opacity: 0, x: -150 },
                                        open: { opacity: 1, x: 0 }
                                    },
                                }}
                        >
                            <input
                                {...register(brand.title)}
                                type="checkbox"
                                value={brand.title}
                                id={brand.title}
                                className="custom-checkbox"
                            />
                            <label htmlFor={brand.title}>{brand.title}</label>
                        </motion.div>
                    ))}

                    <input className="mt-16 w-full h-14 rounded-2xl text-base text-white bg-teal-600 hover:bg-teal-900 cursor-pointer" value='применить' type="submit" />
                    <input
                        className="mt-2 w-full h-14 rounded-2xl text-base text-teal-600 underline hover:text-teal-900 cursor-pointer"
                        value='&#x2715; сбросить'
                        type="button"
                        onClick={onReset}
                    />
                </motion.div>
            </form>

        </div>
    );
}

function Filter() {
    if (isMobile) {
        return <Mobile />;
    } 
        
    return <Desktop />;
    
}

export default Filter;