import * as type from './types'

export function getAllStocks(stocks) {
    return {
        type: type.GET_STOCK_REQUESTED,
        payload: stocks
    }
}

export function getAllWatchList(watchlist) {
    return {
        type: type.GET_WATCHLIST_REQUESTED,
        payload: watchlist
    }
}
