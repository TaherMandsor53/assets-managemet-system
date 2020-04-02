import { fork, all } from 'redux-saga/effects';
import userDetailsSaga from './UserDetailsSaga';
import updatePasswordDetailsSaga from './PasswordDetailsSaga';
import productTypeDetailsSaga from './ProductTypeDetailsSaga';
import insertProductDetailsSaga from './InsertProductDetailsSaga';
import productDetailsSaga from './ProductDetailsSaga';
import purchaseDetailsSaga from './PurchaseDetailsSaga';
import insertPurchaseDetailsSaga from './InsertPurchaseDetailsSaga';
import insertSalesDetailsSaga from './InsertSalesDetailsSaga';
import salesDetailsSaga from './SalesDetailsSaga';

function* sagas() {
	yield fork(userDetailsSaga);
	yield fork(updatePasswordDetailsSaga);
	yield fork(productTypeDetailsSaga);
	yield fork(insertProductDetailsSaga);
	yield fork(productDetailsSaga);
	yield fork(purchaseDetailsSaga);
	yield fork(insertPurchaseDetailsSaga);
	yield fork(insertSalesDetailsSaga);
	yield fork(salesDetailsSaga);
}

export default sagas;
