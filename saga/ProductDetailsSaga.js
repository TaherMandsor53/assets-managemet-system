import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* fetchProductDetails(action) {
	try {
		const productDetails = yield call(api.fetchProductDetails);
		yield put({
			type: types.DISPLAY_PRODUCT_DETAILS_SUCCESS,
			productDetailsData: productDetails.data,
		});
	} catch (e) {
		yield put({ type: types.DISPLAY_PRODUCT_DETAILS_ERROR, message: e.message });
	}
}

function* productDetailsSaga() {
	yield takeLatest(types.DISPLAY_PRODUCT_DETAILS_REQUEST, fetchProductDetails);
}

export default productDetailsSaga;
