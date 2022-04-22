import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';

import ProductCard from '../../components/product-card/product-card.component';
import { selectCategoriesMap } from '../../store/categories/categories.selector';

import './category.styles.scss';

const Category = () => {
	const categoriesMap = useSelector(selectCategoriesMap);
	const { category } = useParams();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [categoriesMap, category]);

	return (
		<Fragment>
			<h2 className='category-title'>{category.toUpperCase()}</h2>

			<div className='category-container'>
				{products &&
					products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</div>
		</Fragment>
	);
};

export default Category;
