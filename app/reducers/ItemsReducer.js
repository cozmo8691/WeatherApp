import uuid from 'js-uuid';

import * as Types from '../actions/actionTypes';
import * as Modes from '../config/modes';

const initialState = {
  items: [],
  editItemId: null,
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
        items: items(action.items, action)
      });
  }
  return state;
};

function items(state = [], action) {
  switch (action.type) {
    case Types.LOAD_ITEMS:
      return state.map(item => Object.assign({}, item, {itemId: uuid()}));
  }
}

export default ItemsReducer;
