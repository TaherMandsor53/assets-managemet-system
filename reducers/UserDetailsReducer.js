import * as types from '../actions/actionTypes';

const userDetails = (
	state = {
		isFetching: false,
		userDetailsData: [],
	},
	action,
) => {
	switch (action.type) {
		case types.USER_DETAILS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case types.USER_DETAILS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				userDetailsData: action.userDetailsData,
			});
		case types.USER_DETAILS_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.message,
			});
		default:
			return state;
	}
};

export default userDetails;
