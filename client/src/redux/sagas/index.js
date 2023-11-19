import { all } from "redux-saga/effects";
import stockSaga from "./stockSaga";
import watchlistSaga from "./watchlistSaga";

export default function* rootSaga() {
  yield all([stockSaga(), watchlistSaga()]);
}
