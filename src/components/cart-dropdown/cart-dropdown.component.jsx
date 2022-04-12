import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../context/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {
	CartDropDownContainer,
	CartItems,
	EmptyCartItems,
} from './cart-dropdown.styles.jsx';

const CartDropDown = () => {
	const { cartItems } = useContext(CartContext);
	const navigate = useNavigate();

	const goToCheckoutHandler = () => {
		navigate('/checkout');
	};

	return (
		<CartDropDownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((item) => <CartItem cartItem={item} key={item.id} />)
				) : (
					<EmptyCartItems>Your cart is empty</EmptyCartItems>
				)}
			</CartItems>

			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</CartDropDownContainer>
	);
};

export default CartDropDown;
