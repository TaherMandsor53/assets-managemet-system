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
