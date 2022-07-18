import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	addItemToCart,
	removeItemFromCart,
	clearItemFromCart,
} from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selectors';
import {
	Arrow,
	BaseSpan,
	CheckoutItemContainer,
	ImageContainer,
	Quantity,
	RemoveButton,
	Value,
} from './checkout-item.styles';

import { CartItem } from '../../store/cart/cart.types';

type CheckoutItemProps = {
	cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
	const { name, quantity, imageUrl, price } = cartItem;
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);

	const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));

	const removeItemHandler = () =>
		dispatch(removeItemFromCart(cartItems, cartItem));

	const clearItemHandler = () =>
		dispatch(clearItemFromCart(cartItems, cartItem));

	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={name} />
			</ImageContainer>

			<BaseSpan>{name}</BaseSpan>

			<Quantity>
				<Arrow onClick={removeItemHandler}>&#10094;</Arrow>

				<Value>{quantity}</Value>

				<Arrow onClick={addItemHandler}>&#10095;</Arrow>
			</Quantity>

			<BaseSpan>{price}</BaseSpan>

			<RemoveButton onClick={clearItemHandler} className='remove-button'>
				&#10005;
			</RemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
