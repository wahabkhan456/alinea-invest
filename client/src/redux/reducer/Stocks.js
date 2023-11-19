import * as type from "../actions/types";

const initialState = {
  stocks: [],
  loading: false,
  error: null,
};

export default function stocks(state = initialState, action) {
  switch (action.type) {
    case type.GET_STOCK_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_STOCK_SUCCESS:
      return {
        ...state,
        loading: false,
        stocks: action.stocks,
      };
    case type.GET_STOCK_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };

    default:
      return state;
  }
}
