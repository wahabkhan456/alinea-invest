import { call, put, takeEvery } from "redux-saga/effects";

import { allStocksApiUrl } from "../../config";

function getStocksApi() {
  return fetch(`${allStocksApiUrl}/popularstocks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => {
      throw err;
    });
}

function* fetchStocks(action) {
  try {
    const stocks = yield call(getStocksApi);
    yield put({ type: "GET_STOCK_SUCCESS", stocks: stocks });
  } catch (error) {
    yield put({ type: "GET_STOCK_FAILED", message: error.message });
  }
}

function* stockSaga() {
  yield takeEvery("GET_STOCK_REQUESTED", fetchStocks);
}

export default stockSaga;
