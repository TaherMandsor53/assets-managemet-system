import * as types from './actionTypes';

export function requestUserDetails() {
	return {
		type: types.USER_DETAILS_REQUEST,
	};
}

export function updatePasswordDetails(passVal) {
	return {
		type: types.SEND_PASSWORD_DETAILS_REQUEST,
		passVal,
	};
}

export function requestProductTypeDetails() {
	return {
		type: types.PRODUCT_TYPE_DETAILS_REQUEST,
	};
}

export function insertProductDetails(productId, productTypeId, productDate, productName, price) {
	return {
		type: types.INSERT_PRODUCT_DETAILS_REQUEST,
		productId,
		productTypeId,
		productDate,
		productName,
		price,
	};
}

export function requestProductDetails() {
	return {
		type: types.DISPLAY_PRODUCT_DETAILS_REQUEST,
	};
}

export function insertPurchaseDetails(
	purchaseId,
	productId,
	quantity,
	totalAmount,
	vendorName,
	modeOfTransaction,
	transactionId,
	purchaseDate,
) {
	return {
		type: types.INSERT_PURCHASE_DETAILS_REQUEST,
		purchaseId,
		productId,
		quantity,
		totalAmount,
		vendorName,
		modeOfTransaction,
		transactionId,
		purchaseDate,
	};
}

export function requestPurchaseDetails() {
	return {
		type: types.DISPLAY_PURCHASE_DETAILS_REQUEST,
	};
}

export function insertSalesDetails(
	salesId,
	productId,
	quantity,
	totalAmount,
	customerName,
	salesDate,
	customerType,
	modeOfTransaction,
	transactionId,
) {
	return {
		type: types.INSERT_SALES_DETAILS_REQUEST,
		salesId,
		productId,
		quantity,
		totalAmount,
		customerName,
		salesDate,
		customerType,
		modeOfTransaction,
		transactionId,
	};
}

export function requestSalesDetails() {
	return {
		type: types.DISPLAY_SALES_DETAILS_REQUEST,
	};
}
