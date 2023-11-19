import * as type from "../actions/types";

const initialState = {
  watchlist: [],
  loading: false,
  error: null,
};

export default function watchlist(state = initialState, action) {
  switch (action.type) {
    case type.GET_WATCHLIST_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_WATCHLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        watchlist: action.watchlist,
      };
    case type.GET_WATCHLIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };

    default:
      return state;
  }
}
