import DirectoryItem from '../directory-item/directory-item.component';

import { categories } from '../../data/categories';

import './directory.styles.scss';

const Directory = () => {
	return (
		<div className='directory-container'>
			{categories.map((category) => (
				<DirectoryItem key={category.id} category={category} />
			))}
		</div>
	);
};

export default Directory;
