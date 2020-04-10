import * as types from '../actions/actionTypes';

const insertEmployeeDetails = (
	state = {
		isFetching: false,
		insertEmployeeDetailsData: [],
	},
	action,
) => {
	switch (action.type) {
		case types.INSERT_EMPLOYEE_DETAILS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case types.INSERT_EMPLOYEE_DETAILS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				insertEmployeeDetailsData: action.insertEmployeeDetailsData,
			});
		case types.INSERT_EMPLOYEE_DETAILS_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.message,
			});
		default:
			return state;
	}
};

export default insertEmployeeDetails;
