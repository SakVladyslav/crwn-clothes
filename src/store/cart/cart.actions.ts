import { CategoryItem } from '../categories/categories.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';
import {
	createAction,
	withMatcher,
	Action,
	ActionWithPayload,
} from '../../utils/reducers/reducer.util';

const addCartItem = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
): CartItem[] => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
	cartItems: CartItem[],
	cartItemToRemove: CartItem
): CartItem[] => {
	// find the cart item to remove
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	// check if quantity is equal to 1, if it is remove that item from the cart
	if (existingCartItem && existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}

	// return back cartitems with matching cart item with reduced quantity
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem) =>
	cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export type SetIsCartOpen = ActionWithPayload<
	CART_ACTION_TYPES.TOGGLE_CART_OPEN,
	boolean
>;

export type SetCartItems = ActionWithPayload<
	CART_ACTION_TYPES.SET_CART_ITEMS,
	CartItem[]
>;

export const setIsCartOpen = withMatcher(
	(set: boolean): SetIsCartOpen =>
		createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, set)
);

export const setCartItems = withMatcher(
	(cartItems: CartItem[]): SetCartItems =>
		createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
	cartItems: CartItem[],
	productToAdd: CartItem
) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return setCartItems(newCartItems);
};

export const removeItemFromCart = (
	cartItems: CartItem[],
	productToRemove: CartItem
) => {
	const newCartItems = removeCartItem(cartItems, productToRemove);
	return setCartItems(newCartItems);
};

export const clearItemFromCart = (
	cartItems: CartItem[],
	productToClear: CartItem
) => {
	const newCartItems = clearCartItem(cartItems, productToClear);
	return setCartItems(newCartItems);
};
