import { combineReducers } from "redux";
import stocks from "./Stocks";
import watchlist from "./Watchlist";

const reducer = combineReducers({
  stocks: stocks,
  watchlist: watchlist,
});

export default reducer;
