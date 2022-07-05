import { CategoryItem } from '../categories/categories.types';

export enum CART_ACTION_TYPES {
	TOGGLE_CART_OPEN = 'CART/TOGGLE_CART_OPEN',
	SET_CART_ITEMS = 'CART/SET_CART_ITEMS',
	SET_CART_TOTAL = 'CART/SET_CART_TOTAL',
	SET_CART_COUNT = 'CART/SET_CART_COUNT',
}

export type CartItem = CategoryItem & {
	quantity: number;
};
