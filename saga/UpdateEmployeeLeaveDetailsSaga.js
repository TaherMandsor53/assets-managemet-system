import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* updateEmployeeLeaveDetails(action) {
	try {
		const updateEmployeeLeaveDetails = yield call(
			api.updateEmployeeLeaveDetails,
			action.employeeId,
			action.leaveCount,
			action.leaveDates,
		);
		yield put({
			type: types.UPDATE_EMPLOYEE_LEAVE_DETAILS_SUCCESS,
			updateEmployeeLeaveDetailsData: updateEmployeeLeaveDetails.data,
		});
	} catch (e) {
		yield put({ type: types.UPDATE_EMPLOYEE_LEAVE_DETAILS_ERROR, message: e.message });
	}
}

function* updateEmployeeLeaveDetailsSaga() {
	yield takeLatest(types.UPDATE_EMPLOYEE_LEAVE_DETAILS_REQUEST, updateEmployeeLeaveDetails);
}

export default updateEmployeeLeaveDetailsSaga;
