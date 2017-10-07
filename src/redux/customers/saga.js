import { all, takeEvery, fork } from 'redux-saga/effects';
import actions from './actions';

export function* addCustomer() {
  yield takeEvery(actions.ADD_CUSTOMER, function*() {});
}
export function* editCustomer() {
  yield takeEvery(actions.EDIT_CUSTOMER, function*() {});
}
export function* deleteCustomer() {
  yield takeEvery(actions.DELETE__CUSTOMER, function*() {});
}
export default function* rootSaga() {
  yield all([fork(addCustomer), fork(editCustomer), fork(deleteCustomer)]);
}
