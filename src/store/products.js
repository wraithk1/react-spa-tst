import productList from '../data/products.json'
import brandList from '../data/brands.json'

const filterProducts = (filter) => {
    const value = productList.map((product, idx) => ({
        ...product,
        brand: brandList?.filter(br => br.id === product.brand)[0]
    }))

    return filter ? value.filter((product, idx) => filter.some(item => item.title === product.brand.title)) : value
}

const _products = productList.map((product, idx) => ({
    ...product,
    brand: brandList.filter(br => br.id === product.brand)[0]
}))

export function products(store) {
    store.on('@init', () => ({
        products: _products
    }))

    store.on('products/filter', ({products}, filter) => ({
        products: _products.filter((product, idx) => filter.some(item => item === product.brand.title))
    }))

    store.on('products/clear', () => ({
        products: _products
    }))
}