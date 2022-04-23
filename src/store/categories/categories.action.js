import { createAction } from '../../utils/reducers/reducer.util';
import { CATEGORIES_ACTION_TYPES } from './categories.types';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.util';

export const fetchCategoriesStart = () =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categories) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
	dispatch(fetchCategoriesStart());

	try {
		const categories = await getCategoriesAndDocuments();
		dispatch(fetchCategoriesSuccess(categories));
	} catch (error) {
		dispatch(fetchCategoriesFailed(error));
	}
};
