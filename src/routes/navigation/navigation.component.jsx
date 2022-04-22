import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.util';
import { selectIsCartOpen } from '../../store/cart/cart.selectors';

import {
	NavigationContainer,
	NavLink,
	NavLinksContainer,
	LogoContainer,
} from './navigation.styles.jsx';

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser);
	const isCartOpen = useSelector(selectIsCartOpen);

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrwnLogo className='logo' />
				</LogoContainer>

				<NavLinksContainer>
					<NavLink to='/shop'>SHOP</NavLink>

					{currentUser ? (
						<NavLink as='span' onClick={signOutUser}>
							SIGN OUT
						</NavLink>
					) : (
						<NavLink to='/auth'>SIGN IN</NavLink>
					)}

					<CartIcon />
				</NavLinksContainer>

				{isCartOpen && <CartDropDown />}
			</NavigationContainer>

			<Outlet />
		</Fragment>
	);
};

export default Navigation;
