import * as Types from "../actions/actionTypes";
import * as Modes from "../config/modes";

import store from "../store";
import API from "../API/API";

export function initFetchItems(url) {
  return dispatch => {
    dispatch(updateFetchItemsStatus(Modes.pending));
    dispatch(fetchItems(url));
  };
}

function fetchItems(url) {
  return dispatch =>
    API.makeRequest(url)
      .then(response => response.json())
      .then(json => {
        dispatch(fetchItemsSuccess(json));
      })
      .catch(err => {
        dispatch(updateFetchItemsStatus(Modes.DONE_FAIL));
        console.log(`something went wrong: ${err}`);
      });
}

function fetchItemsSuccess(json) {
  return dispatch => {
    dispatch(loadItems(groupByDay(json.list)));
    dispatch(updateFetchItemsStatus(Modes.DONE_SUCCESS));
  };
}

function groupByDay(list) {
  return list
    .map(item =>
      Object.assign({}, item, { dateKey: item.dt_txt.split(" ")[0] })
    )
    .reduce((acc, curr) => {
      if (!acc[curr.dateKey]) {
        return Object.assign({}, acc, { [curr.dateKey]: [curr] });
      }
      return Object.assign({}, acc, {
        [curr.dateKey]: [...acc[curr.dateKey], curr]
      });
    }, {});
}

function updateFetchItemsStatus(nextStatus) {
  return {
    type: Types.UPDATE_FETCH_ITEMS_STATUS,
    nextStatus
  };
}

function loadItems(items) {
  return {
    type: Types.LOAD_ITEMS,
    items
  };
}
