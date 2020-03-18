import { combineReducers } from 'redux';

import userDetails from './UserDetailsReducer';
import passwordDetailsData from './UpdatePasswordReducer';
import productTypeDetails from './ProductTypeDetailsReducer';
import insertProductDetails from './InsertProductDetailsReducer';
import productDetails from './ProductDetailsReducer';

export default combineReducers({
	userDetails,
	passwordDetailsData,
	productTypeDetails,
	insertProductDetails,
	productDetails,
});
