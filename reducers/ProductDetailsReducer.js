import * as types from '../actions/actionTypes';

const productDetails = (
	state = {
		isFetching: false,
		productDetailsData: [],
	},
	action,
) => {
	switch (action.type) {
		case types.DISPLAY_PRODUCT_DETAILS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case types.DISPLAY_PRODUCT_DETAILS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				productDetailsData: action.productDetailsData,
			});
		case types.DISPLAY_PRODUCT_DETAILS_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.message,
			});
		default:
			return state;
	}
};

export default productDetails;
