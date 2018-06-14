import React from "react";
import PropTypes from "prop-types";

import settings from "../config/settings";

const Forecast = ({ dayForecast }) =>
  dayForecast.map(forecast => {
    return (
      <div key={forecast.dt} className="forecast">
        <p className="forecast-time">{forecast.time}</p>
        <p className="forecast-desc">{forecast.desc}</p>
        <img src={forecast.icon} alt={forecast.desc} />
        <p className="temperature" style={{ background: forecast.tempColour }}>
          {forecast.temp}&deg;
        </p>
        <p className="wind-speed">
          <small>Wind speed</small>
          {forecast.windSpeed} <small>metres per sec</small>
        </p>
      </div>
    );
  });

Forecast.propTypes = {
  dayForecast: PropTypes.array.isRequired
};

Forecast.defaultProps = {
  dayForecast: []
};

export default Forecast;
