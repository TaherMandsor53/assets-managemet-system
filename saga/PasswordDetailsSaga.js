import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* updatePasswordDetails(action) {
	try {
		const passwordDetails = yield call(api.updatePasswordDetails, action.passVal);
		yield put({
			type: types.SEND_PASSWORD_DETAILS_SUCCESS,
			passwordDetailsData: passwordDetails.data,
		});
	} catch (e) {
		yield put({ type: types.SEND_PASSWORD_DETAILS_ERROR, message: e.message });
	}
}

function* updatePasswordDetailsSaga() {
	yield takeLatest(types.SEND_PASSWORD_DETAILS_REQUEST, updatePasswordDetails);
}

export default updatePasswordDetailsSaga;
