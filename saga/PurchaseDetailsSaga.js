import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* fetchPurchaseDetails(action) {
	try {
		const purchaseDetails = yield call(api.fetchPurchaseDetails);
		yield put({
			type: types.DISPLAY_PURCHASE_DETAILS_SUCCESS,
			purchaseDetailsData: purchaseDetails.data,
		});
	} catch (e) {
		yield put({ type: types.DISPLAY_PURCHASE_DETAILS_ERROR, message: e.message });
	}
}

function* purchaseDetailsSaga() {
	yield takeLatest(types.DISPLAY_PURCHASE_DETAILS_REQUEST, fetchPurchaseDetails);
}

export default purchaseDetailsSaga;
