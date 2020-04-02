import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* insertSalesDetails(action) {
	try {
		const insertSalesDetails = yield call(
			api.insertSalesDetails,
			action.salesId,
			action.productId,
			action.quantity,
			action.totalAmount,
			action.customerName,
			action.salesDate,
			action.customerType,
			action.modeOfTransaction,
			action.transactionId,
		);
		yield put({
			type: types.INSERT_SALES_DETAILS_SUCCESS,
			insertSalesDetailsData: insertSalesDetails.data,
		});
	} catch (e) {
		yield put({ type: types.INSERT_SALES_DETAILS_ERROR, message: e.message });
	}
}

function* insertSalesDetailsSaga() {
	yield takeLatest(types.INSERT_SALES_DETAILS_REQUEST, insertSalesDetails);
}

export default insertSalesDetailsSaga;
