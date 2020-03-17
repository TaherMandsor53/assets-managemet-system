import { combineReducers } from 'redux';

import userDetails from './UserDetailsReducer';
import passwordDetailsData from './UpdatePasswordReducer';
import productTypeDetails from './ProductTypeDetailsReducer';

export default combineReducers({
	userDetails,
	passwordDetailsData,
	productTypeDetails,
});
