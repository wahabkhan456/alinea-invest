import { call, put, takeEvery } from "redux-saga/effects";

import { allStocksApiUrl } from "../../config";

function getWatchList() {
  const id = localStorage.getItem("signId");
  return fetch(`${allStocksApiUrl}/getstocks?id=${id}`, {
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

function* fetchWatchlist(action) {
  try {
    const watchlist = yield call(getWatchList);
    yield put({ type: "GET_WATCHLIST_SUCCESS", watchlist: watchlist });
  } catch (error) {
    yield put({ type: "GET_WATCHLIST_FAILED", message: error.message });
  }
}

function* watchListSaga() {
  yield takeEvery("GET_WATCHLIST_REQUESTED", fetchWatchlist);
}

export default watchListSaga;
