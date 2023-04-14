import React, { useEffect, useState } from "react";
import { useStoreon } from 'storeon/react';
import BasketCard from "../components/basketcard";
import Loader from "../components/loader";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


function Basket() {
    const { dispatch, basket } = useStoreon('basket')
    const [loading, setLoading] = useState(true)
    const [misOpen, setMisopen] = useState(false)

    useEffect(() => {
        setTimeout(() => setLoading(false), 500);
    }, []);

    const mtoggle = () => setMisopen(!misOpen)

    const handlePay = async (e) => {
        e.preventDefault();

        let req = await fetch('https://app.aaccent.su/js/confirm.php', {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify(basket)
        })

        let { result } = await req.json()

        if(result === 'ok') mtoggle();
    }

    const handleMclose = () => {
        dispatch('basket/clear')
        mtoggle()
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <div className="w-full min-h-screen relative bg-cusgray pb-10">
                <div className="max-w-6xl mx-auto lg:pt-20 sm:pt-10 px-5">
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4">
                        <div className="md:col-span-2 md:mr-5">
                            <div className="">
                                <div className="rounded-xl bg-white px-5 pt-5 shadow-lg overflow-hidden">
                                    <p>Корзина: ({basket.length})</p>
                                    <div className="pt-5 pb-2">
                                        {basket.length > 0 &&
                                            basket.map((item, idx) => (
                                                <BasketCard idx={idx} key={item.id} item={item} />
                                            ))}
                                        {basket.length === 0 && (
                                            <div className="text-gray-400 text-sm mb-10">
                                                <img
                                                    className="md:w-1/3 object-cover w-full mx-auto"
                                                    src="https://i.ibb.co/hWZhd6F/empty-cart-4a7779da-Convert-Image.png"
                                                    alt=""
                                                />
                                                <p className="text-center">
                                                    Корзина пуста
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 md:mt-0 col-span-1">
                            <div className="rounded-xl bg-white shadow-lg py-6 px-5">
                                <h1 className="text-cusblack font-bold text-md">СВОДКА</h1>
                                <div className="px-4 py-3 text-xs font-medium flex place-items-center text-gray-400 border border-gray-200 rounded-md my-4">
                                    <svg
                                        className="w-5 h-5 mr-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                                        />
                                    </svg>
                                    У ВАС КСТЬ ПРОМОКОД?
                                </div>

                                <div className="text-sm pt-1 font-semibold pb-2 border-b border-cusblack flex justify-between place-items-center">
                                    <p className="">П. ИТОГ</p>
                                    {(basket.reduce((val, item) => val + item.regular_price?.value * item.quantity, 0)).toFixed(2)} USD
                                </div>

                                <div className="my-3 border-b border-cusblack pb-2">
                                    {basket.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between place-items-center text-sm mb-1"
                                        >
                                            <p className="pr-3">{item.title}</p>
                                            {(item.regular_price?.value * item.quantity).toFixed(2)} USD
                                        </div>
                                    ))}
                                    <div className="flex justify-between place-items-center text-sm mb-1">
                                        <p>ДОСТАВКА</p>
                                        <p>БЕСПЛАТНО</p>
                                    </div>
                                </div>

                                <div className="flex justify-between place-items-center font-semibold">
                                    <p>ИТОГ</p>
                                    {(basket.reduce((val, item) => val + item.regular_price?.value * item.quantity, 0)).toFixed(2)} USD
                                </div>

                                <button
                                    disabled={!basket.length}
                                    onClick={handlePay}
                                    className="py-2 px-3 disabled:cursor-not-allowed text-white w-full mt-6 rounded-lg bg-gray-900"
                                >
                                    {!loading ? (
                                        <span className="flex justify-center place-items-center">
                                            ГОТОВО
                                            <svg
                                                className="ml-2 w-4 h-4 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                />
                                            </svg>
                                        </span>
                                    ) : (
                                        <img
                                            className="w-6 h-6 mx-auto"
                                            src="https://i.ibb.co/pL1TJSg/Rolling-1s-200px-2.gif"
                                            alt=""
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={misOpen} toggle={mtoggle} centered>
                <ModalHeader toggle={mtoggle}>Заказ</ModalHeader>
                <ModalBody className="flex justify-center">
                    <span className="text-lg text-black uppercase">Оплата прошла успешно!</span>
                </ModalBody>
                <ModalFooter>
                    <Button className="!bg-gray-900" onClick={handleMclose}>
                        OK
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default Basket;