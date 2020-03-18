import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* insertProductDetails(action) {
	try {
		const insertProductDetails = yield call(
			api.insertProductDetails,
			action.productId,
			action.productTypeId,
			action.productDate,
			action.productName,
			action.price,
		);
		yield put({
			type: types.INSERT_PRODUCT_DETAILS_SUCCESS,
			insertProductDetailsData: insertProductDetails.data,
		});
	} catch (e) {
		yield put({ type: types.INSERT_PRODUCT_DETAILS_ERROR, message: e.message });
	}
}

function* insertProductDetailsSaga() {
	yield takeLatest(types.INSERT_PRODUCT_DETAILS_REQUEST, insertProductDetails);
}

export default insertProductDetailsSaga;
