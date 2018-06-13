import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import * as Modes from "../config/modes";
import settings from "../config/settings";
import { initFetchItems } from "../actions/actions";
import Forecast from "./Forecast";

export class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDay: null
    };
  }

  componentDidMount() {
    this.props.initFetchItems(settings.itemsURL);
  }

  _updateSelectedDay = selectedDay => {
    this.setState({ selectedDay });
  };

  render() {
    const { items, requestStatus } = this.props;
    const selectedDay = this.state.selectedDay || Object.keys(items)[0];

    return (
      <div className="wrapper">
        <header role="banner">
          <h1>Edinburgh - 5 day Forecast</h1>
          <nav>
            {Object.keys(items).map((item, i) => {
              const date = moment.unix(items[item][0].dt);
              const formattedDate = moment(date).format("DD/MM/YYYY");
              const dayName = moment(date).format("dddd");

              return (
                <div
                  key={item}
                  className={`day-tab${
                    selectedDay === item ? " selected" : ""
                  }`}
                  onClick={this._updateSelectedDay.bind(null, item)}
                >
                  {i === 0 ? (
                    "Today"
                  ) : (
                    <React.Fragment>
                      <div className="day-name">{dayName}</div>
                      <div className="day-date">{formattedDate}</div>
                    </React.Fragment>
                  )}
                </div>
              );
            })}
          </nav>
        </header>
        <main>
          {Modes.MODES_OUTPUT_MESSAGE[requestStatus] || (
            <Forecast dayForecast={items[selectedDay]} />
          )}
        </main>
      </div>
    );
  }
}

MainContainer.propTypes = {
  initFetchItems: PropTypes.func.isRequired,
  items: PropTypes.any.isRequired,
  requestStatus: PropTypes.string
};

const mapStateToProps = store => {
  return {
    items: store.itemsState.items,
    requestStatus: store.itemsState.requestStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    initFetchItems: url => {
      dispatch(initFetchItems(url));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
