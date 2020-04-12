import * as types from '../actions/actionTypes';

const updateEmployeeLeaveDetails = (
	state = {
		isFetching: false,
		updateEmployeeLeaveDetailsData: [],
	},
	action,
) => {
	switch (action.type) {
		case types.UPDATE_EMPLOYEE_LEAVE_DETAILS_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case types.UPDATE_EMPLOYEE_LEAVE_DETAILS_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				updateEmployeeLeaveDetailsData: action.updateEmployeeLeaveDetailsData,
			});
		case types.UPDATE_EMPLOYEE_LEAVE_DETAILS_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.message,
			});
		default:
			return state;
	}
};

export default updateEmployeeLeaveDetails;
