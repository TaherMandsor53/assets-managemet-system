import * as types from '../actions/actionTypes';

const salesDetails = (
	state = {
		isFetching: false,
		salesDetailsData: [],
	},
	action,
) => {
	switch (action.type) {
		case types.DISPLAY_SALES_DETAILS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case types.DISPLAY_SALES_DETAILS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				salesDetailsData: action.salesDetailsData,
			});
		case types.DISPLAY_SALES_DETAILS_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.message,
			});
		default:
			return state;
	}
};

export default salesDetails;
