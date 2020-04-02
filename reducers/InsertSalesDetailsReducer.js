import * as types from '../actions/actionTypes';

const insertSalesDetails = (
	state = {
		isFetching: false,
		insertSalesDetailsData: [],
	},
	action,
) => {
	switch (action.type) {
		case types.INSERT_SALES_DETAILS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case types.INSERT_SALES_DETAILS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				insertSalesDetailsData: action.insertSalesDetailsData,
			});
		case types.INSERT_SALES_DETAILS_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.message,
			});
		default:
			return state;
	}
};

export default insertSalesDetails;
