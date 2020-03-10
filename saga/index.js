import { fork, all } from 'redux-saga/effects';
import userDetailsSaga from './UserDetailsSaga';
import updatePasswordDetailsSaga from './PasswordDetailsSaga';

function* sagas() {
	yield fork(userDetailsSaga);
	yield fork(updatePasswordDetailsSaga);
}

export default sagas;
