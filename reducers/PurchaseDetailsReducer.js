import * as types from '../actions/actionTypes';

const purchaseDetails = (
	state = {
		isFetching: false,
		purchaseDetailsData: [],
	},
	action,
) => {
	switch (action.type) {
		case types.DISPLAY_PURCHASE_DETAILS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case types.DISPLAY_PURCHASE_DETAILS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				purchaseDetailsData: action.purchaseDetailsData,
			});
		case types.DISPLAY_PURCHASE_DETAILS_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.message,
			});
		default:
			return state;
	}
};

export default purchaseDetails;
