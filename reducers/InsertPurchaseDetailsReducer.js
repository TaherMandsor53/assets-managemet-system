import * as types from '../actions/actionTypes';

const insertPurchaseDetails = (
	state = {
		isFetching: false,
		insertPurchaseDetailsData: [],
	},
	action,
) => {
	switch (action.type) {
		case types.INSERT_PURCHASE_DETAILS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case types.INSERT_PURCHASE_DETAILS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				insertPurchaseDetailsData: action.insertPurchaseDetailsData,
			});
		case types.INSERT_PURCHASE_DETAILS_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.message,
			});
		default:
			return state;
	}
};

export default insertPurchaseDetails;
