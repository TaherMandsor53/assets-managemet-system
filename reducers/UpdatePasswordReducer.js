import * as types from '../actions/actionTypes';

const passwordDetailsData = (
	state = {
		isFetching: false,
		passwordDetails: [],
	},
	action,
) => {
	switch (action.type) {
		case types.SEND_PASSWORD_DETAILS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case types.SEND_PASSWORD_DETAILS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				passwordDetails: action.passwordDetails,
			});
		case types.SEND_PASSWORD_DETAILS_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.message,
			});
		default:
			return state;
	}
};

export default passwordDetailsData;
