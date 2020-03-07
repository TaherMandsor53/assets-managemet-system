import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* fetchUserDetails(action) {
	try {
		const userDetails = yield call(api.fetchUserDetails);
		yield put({
			type: types.USER_DETAILS_SUCCESS,
			userDetailsData: userDetails.data,
		});
	} catch (e) {
		yield put({ type: types.USER_DETAILS_ERROR, message: e.message });
	}
}

function* userDetailsSaga() {
	yield takeLatest(types.USER_DETAILS_REQUEST, fetchUserDetails);
}

export default userDetailsSaga;
