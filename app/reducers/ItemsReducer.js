import * as Types from "../actions/actionTypes";
import * as Modes from "../config/modes";

const initialState = {
  items: {},
  fetchItemsStatus: Modes.IDLE
};

const ItemsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Types.UPDATE_FETCH_ITEMS_STATUS:
      return Object.assign({}, state, {
        fetchItemsStatus: action.nextStatus
      });

    case Types.LOAD_ITEMS:
      return Object.assign({}, state, {
        items: action.items
      });
  }
  return state;
};

export default ItemsReducer;
