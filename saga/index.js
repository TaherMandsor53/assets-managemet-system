import { fork, all } from 'redux-saga/effects';
import userDetailsSaga from './UserDetailsSaga';
import updatePasswordDetailsSaga from './PasswordDetailsSaga';
import productTypeDetailsSaga from './ProductTypeDetailsSaga';
import insertProductDetailsSaga from './InsertProductDetailsSaga';
import productDetailsSaga from './ProductDetailsSaga';

function* sagas() {
	yield fork(userDetailsSaga);
	yield fork(updatePasswordDetailsSaga);
	yield fork(productTypeDetailsSaga);
	yield fork(insertProductDetailsSaga);
	yield fork(productDetailsSaga);
}

export default sagas;
