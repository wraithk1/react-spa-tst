import {createStoreon} from 'storeon';
import {products} from './products'
import { basket } from './basket';
import { pagination } from './pagination';

export const store = createStoreon([
    products,
    basket,
    pagination
]);