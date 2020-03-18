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
