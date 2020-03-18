import * as types from '../actions/actionTypes';

const insertProductDetails = (
	state = {
		isFetching: false,
		insertProductDetailsData: [],
	},
	action,
) => {
	switch (action.type) {
		case types.INSERT_PRODUCT_DETAILS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case types.INSERT_PRODUCT_DETAILS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				insertProductDetailsData: action.insertProductDetailsData,
			});
		case types.INSERT_PRODUCT_DETAILS_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.message,
			});
		default:
			return state;
	}
};

export default insertProductDetails;
