import * as types from '../actions/actionTypes';

const productTypeDetails = (
	state = {
		isFetching: false,
		productTypeDetailsData: [],
	},
	action,
) => {
	switch (action.type) {
		case types.PRODUCT_TYPE_DETAILS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case types.PRODUCT_TYPE_DETAILS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				productTypeDetailsData: action.productTypeDetailsData,
			});
		case types.PRODUCT_TYPE_DETAILS_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.message,
			});
		default:
			return state;
	}
};

export default productTypeDetails;
