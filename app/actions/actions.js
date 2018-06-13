import * as Types from "../actions/actionTypes";
import * as Modes from "../config/modes";
import settings from "../config/settings";

import store from "../store";
import API from "../API/API";

const tempColours = [
  "darkblue",
  "lightblue",
  "lightgreen",
  "yellow",
  "orange",
  "red"
];
const tempRange = [-20, 40];

export function initFetchItems(url) {
  return dispatch => {
    dispatch(updateRequestStatus(Modes.pending));
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
        dispatch(updateRequestStatus(Modes.DONE_FAIL));
        console.log(`something went wrong: ${err}`);
      });
}

function fetchItemsSuccess(json) {
  return dispatch => {
    const formattedList = setUpValues(json.list);

    dispatch(loadItems(groupByDay(formattedList)));
    dispatch(updateRequestStatus(Modes.DONE_SUCCESS));
  };
}

function setUpValues(list) {
  return list.map(item => {
    const time = item.dt_txt.match(/\d{2}:\d{2}/)[0];
    const desc = item.weather[0].main;
    const icon = `${settings.iconsURL}${item.weather[0].icon}.png`;
    const temp = Math.round(item.main.temp);
    const colourIndex = Math.round(
      (temp - tempRange[0]) /
        (tempRange[1] - tempRange[0]) *
        (tempColours.length - 1)
    );
    const tempColour = tempColours[colourIndex];
    const windSpeed = item.wind.speed;

    return Object.assign({}, item, {
      time,
      desc,
      icon,
      temp,
      tempColour,
      windSpeed
    });
  });
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

function updateRequestStatus(nextStatus) {
  return {
    type: Types.UPDATE_REQUEST_STATUS,
    nextStatus
  };
}

function loadItems(items) {
  return {
    type: Types.LOAD_ITEMS,
    items
  };
}
