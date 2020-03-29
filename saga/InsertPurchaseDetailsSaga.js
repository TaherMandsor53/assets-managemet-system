import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* insertPurchaseDetails(action) {
	try {
		const insertPurchaseDetails = yield call(
			api.insertPurchaseDetails,
			action.purchaseId,
			action.productId,
			action.quantity,
			action.totalAmount,
			action.vendorName,
			action.modeOfTransaction,
			action.transactionId,
			action.purchaseDate,
		);
		yield put({
			type: types.INSERT_PURCHASE_DETAILS_SUCCESS,
			insertPurchaseDetailsData: insertPurchaseDetails.data,
		});
	} catch (e) {
		yield put({ type: types.INSERT_PURCHASE_DETAILS_ERROR, message: e.message });
	}
}

function* insertPurchaseDetailsSaga() {
	yield takeLatest(types.INSERT_PURCHASE_DETAILS_REQUEST, insertPurchaseDetails);
}

export default insertPurchaseDetailsSaga;
