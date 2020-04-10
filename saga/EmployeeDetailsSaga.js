import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* fetchEmployeeDetails(action) {
	try {
		const employeeDetails = yield call(api.fetchEmployeeDetails);
		yield put({
			type: types.DISPLAY_EMPLOYEE_DETAILS_SUCCESS,
			employeeDetailsData: employeeDetails.data,
		});
	} catch (e) {
		yield put({ type: types.DISPLAY_EMPLOYEE_DETAILS_ERROR, message: e.message });
	}
}

function* employeeDetailsSaga() {
	yield takeLatest(types.DISPLAY_EMPLOYEE_DETAILS_REQUEST, fetchEmployeeDetails);
}

export default employeeDetailsSaga;
