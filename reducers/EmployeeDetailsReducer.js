import * as types from '../actions/actionTypes';

const employeeDetails = (
	state = {
		isFetching: false,
		employeeDetailsData: [],
	},
	action,
) => {
	switch (action.type) {
		case types.DISPLAY_EMPLOYEE_DETAILS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case types.DISPLAY_EMPLOYEE_DETAILS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				employeeDetailsData: action.employeeDetailsData,
			});
		case types.DISPLAY_EMPLOYEE_DETAILS_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.message,
			});
		default:
			return state;
	}
};

export default employeeDetails;
