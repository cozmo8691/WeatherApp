import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import settings from "../config/settings";
import { initFetchItems } from "../actions/actions";

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

  _mapToColourRange = val => {
    const colourIndex = Math.round((val - -20) / (40 - -20) * 5);
    return ["darkblue", "lightblue", "lightgreen", "yellow", "orange", "red"][
      colourIndex
    ];
  };

  render() {
    const { items } = this.props;
    const selectedDay = this.state.selectedDay || Object.keys(items)[0];

    return (
      <div className="wrapper">
        <header>
          <h1>Edinburgh - 5 day Forecast</h1>
          <nav>
            {Object.keys(items).map(item => (
              <div
                key={item}
                className={`day-tab${selectedDay === item ? " selected" : ""}`}
                onClick={this._updateSelectedDay.bind(null, item)}
              >
                {item}
              </div>
            ))}
          </nav>
        </header>
        <main>
          {items[selectedDay] &&
            items[selectedDay].map(forecast => {
              const time = forecast.dt_txt.split(" ")[1];
              const desc = forecast.weather[0].main;
              const iconURL = `${settings.iconsURL}${
                forecast.weather[0].icon
              }.png`;
              const temp = Math.round(forecast.main.temp);
              return (
                <div key={forecast.dt} className="forecast">
                  <p>{time}</p>
                  <p>{desc}</p>
                  <img src={iconURL} alt={desc} />
                  <p
                    className="temperature"
                    style={{ background: this._mapToColourRange(temp) }}
                  >
                    {temp}
                  </p>
                  <p />
                </div>
              );
            })}
        </main>
      </div>
    );
  }
}

MainContainer.propTypes = {
  initFetchItems: PropTypes.func.isRequired,
  items: PropTypes.any.isRequired
};

const mapStateToProps = store => {
  return {
    items: store.itemsState.items
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
