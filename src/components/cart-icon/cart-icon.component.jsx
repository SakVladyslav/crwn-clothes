import { useSelector, useDispatch } from 'react-redux';
import {
	selectCartCount,
	selectIsCartOpen,
} from '../../store/cart/cart.selectors';

import { setIsCartOpen } from '../../store/cart/cart.actions';

import {
	ShoppingIcon,
	CartIconContainer,
	ItemCount,
} from './cart-icon.styles.jsx';

const CartIcon = () => {
	const dispatch = useDispatch();
	const isCartOpen = useSelector(selectIsCartOpen);
	const cartCount = useSelector(selectCartCount);

	const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon className='shopping-icon' />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
