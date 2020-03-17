import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from '../actions/actionTypes';
import api from '../api/api';

function* fetchProductTypeDetails(action) {
	try {
		const productTypeDetails = yield call(api.fetchProductTypeDetails);
		yield put({
			type: types.PRODUCT_TYPE_DETAILS_SUCCESS,
			productTypeDetailsData: productTypeDetails.data,
		});
	} catch (e) {
		yield put({ type: types.PRODUCT_TYPE_DETAILS_ERROR, message: e.message });
	}
}

function* productTypeDetailsSaga() {
	yield takeLatest(types.PRODUCT_TYPE_DETAILS_REQUEST, fetchProductTypeDetails);
}

export default productTypeDetailsSaga;
