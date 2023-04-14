import React, { useEffect, useState } from "react";
//import products from '../data/products.json';
//import brands from '../data/brands.json'
import Card from "../components/card";
import Filter from "../components/filter";
import { useStoreon } from 'storeon/react';
import Loader from "../components/loader";


function Home() {
    const { dispatch, products, pagination } = useStoreon('products', 'pagination');
    const [loading, setLoading] = useState(true);

    const { page, takeFrom, takeTo, totalPage } = pagination;

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <div className='grid grid-cols-4 gap-x-6'>
            {/*  Filter  */}
            <Filter />

            {/*  Content  */}
            <div className='col-span-4 md:col-span-4 lg:col-span-3 flex flex-col py-4 mx-2 md:mx-0'>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-6'>

                    {products.slice(takeFrom, takeTo).map((product, idx) => (
                        <Card
                            item={product}
                        />
                    ))}

                </div>

                {products.length > 6 &&
                    <div className='flex flex-row space-x-2 mx-auto mt-4 lg:mt-14'>
                        <button
                            disabled={page <= 1}
                            onClick={() =>
                                dispatch('pagination/change', +page - 1)
                            }
                            className={`btn ${page <= 1 && 'opacity-20 cursor-not-allowed'}`}
                        >
                            <i className="arrow left !border-white"></i>
                        </button>

                        {/* All pages */}
                        <div className="flex justify-between space-x-3">
                            {Array(totalPage)
                                .fill('')
                                .map((_, i) => (
                                    <button
                                        onClick={() =>
                                            dispatch('pagination/change', i + 1)
                                        }
                                        key={i}
                                        className={`btn text-xl cursor-pointer ${i + 1 == page && '!bg-teal-900'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                        </div>

                        {/* from current page to next page */}
                        <button
                            disabled={page == totalPage}
                            onClick={() =>
                                dispatch('pagination/change', +page + 1)
                            }
                            className={`btn ${page == totalPage && 'opacity-20 cursor-not-allowed'}`}
                        >
                            <i className="arrow right !border-white"></i>
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default Home;