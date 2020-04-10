import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* insertEmployeeDetails(action) {
	try {
		const insertEmployeeDetails = yield call(
			api.insertEmployeeDetails,
			action.designationId,
			action.staffName,
			action.address,
			action.dob,
			action.doj,
			action.identityVal,
			action.salaryVal,
		);
		yield put({
			type: types.INSERT_EMPLOYEE_DETAILS_SUCCESS,
			insertEmployeeDetailsData: insertEmployeeDetails.data,
		});
	} catch (e) {
		yield put({ type: types.INSERT_EMPLOYEE_DETAILS_ERROR, message: e.message });
	}
}

function* insertEmployeeDetailsSaga() {
	yield takeLatest(types.INSERT_EMPLOYEE_DETAILS_REQUEST, insertEmployeeDetails);
}

export default insertEmployeeDetailsSaga;
