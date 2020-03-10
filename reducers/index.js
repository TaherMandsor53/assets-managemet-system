import { combineReducers } from 'redux';

import userDetails from './UserDetailsReducer';
import passwordDetailsData from './UpdatePasswordReducer';

export default combineReducers({
	userDetails,
	passwordDetailsData,
});
