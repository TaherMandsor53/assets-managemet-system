import { fork, all } from 'redux-saga/effects';
import userDetailsSaga from './UserDetailsSaga';

function* sagas() {
	yield fork(userDetailsSaga);
}

export default sagas;
