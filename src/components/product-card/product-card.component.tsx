import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart } from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selectors';
import { CategoryItem } from '../../store/categories/categories.types';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {
	Footer,
	Name,
	Price,
	ProductCardContainer,
} from './product-card.styles';

type ProductCardProps = {
	product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
	const dispatch = useDispatch();

	const { name, price, imageUrl } = product;
	const cartItems = useSelector(selectCartItems);

	const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={name} />

			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>

			<Button
				onClick={addProductToCart}
				buttonType={BUTTON_TYPE_CLASSES.inverted}>
				Add to card
			</Button>
		</ProductCardContainer>
	);
};

export default ProductCard;
