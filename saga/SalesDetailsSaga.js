import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* fetchSalesDetails(action) {
	try {
		const salesDetails = yield call(api.fetchSalesDetails);
		yield put({
			type: types.DISPLAY_SALES_DETAILS_SUCCESS,
			salesDetailsData: salesDetails.data,
		});
	} catch (e) {
		yield put({ type: types.DISPLAY_SALES_DETAILS_ERROR, message: e.message });
	}
}

function* salesDetailsSaga() {
	yield takeLatest(types.DISPLAY_SALES_DETAILS_REQUEST, fetchSalesDetails);
}

export default salesDetailsSaga;
