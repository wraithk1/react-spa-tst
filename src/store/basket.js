export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};



export function basket(store) {
    store.on('@init', () => ({ basket: [] }))

    store.on('basket/add', ({ basket }, item) => ({basket: addItemToCart(basket, item)}))

    store.on('basket/remove', ({ basket }, item) => ({basket: basket.filter((itm) => itm.id !== item.id)}))

    store.on('basket/plus', ({ basket }, idx) => {
        [...basket, (basket[idx].quantity += 1)].pop()
        return { basket } 
    })

    store.on('basket/minus', ({ basket }, idx) => {
        [...basket, (basket[idx].quantity -= 1)].pop()
        return { basket } 
    })

    store.on('basket/clear', ({ basket })=> ({basket: []}))
}