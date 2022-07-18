import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { DirectoryCategory } from '../../data/categories';

import {
	DirectoryItemContainer,
	DirectoryItemBackgroundImage,
	DirectoryItemBody,
} from './directory-item.styles';

type DirectoryItemProps = {
	category: DirectoryCategory;
};

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
	const { imageUrl, title, route } = category;
	const navigate = useNavigate();

	const onNavigateHandler = () => {
		navigate(route);
	};

	return (
		<DirectoryItemContainer onClick={onNavigateHandler}>
			<DirectoryItemBackgroundImage imageUrl={imageUrl} />

			<DirectoryItemBody>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</DirectoryItemBody>
		</DirectoryItemContainer>
	);
};

export default DirectoryItem;
