const init = (length) => ({
    page: 1,
    takeFrom: 0,
    takeTo: 6,
    totalPage: Math.ceil(length / 6)
})

export function pagination(store) {
    store.on('@init', ({ products }) => ({
        pagination: init(products.length)
    }))

    store.on('pagination/change', ({ products }, page) => ({
        pagination: {
            page,
            takeFrom: +(page - 1) * 6,
            takeTo: +page * 6,
            totalPage: Math.ceil(products.length / 6)
        }
    }))

    store.on('pagination/clear', ({products}) => ({
        pagination: init(products.length)
    }))
}