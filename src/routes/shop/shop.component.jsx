import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.util';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { setCategories } from '../../store/categories/categories.action';

import './shop.styles.scss';

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categories = await getCategoriesAndDocuments();
			dispatch(setCategories(categories));
		};

		getCategoriesMap();
	}, [dispatch]);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=':category' element={<Category />} />
		</Routes>
	);
};

export default Shop;
