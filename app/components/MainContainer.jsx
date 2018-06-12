import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import settings from "../config/settings";
import { initFetchItems } from "../actions/actions";

export class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    this.props.initFetchItems(settings.itemsURL);
  }

  render() {
    const { items } = this.props;

    console.log(items);

    return (
      <div>
        <section>
          {Object.keys(items).map(item => <div key={item}>{item}</div>)}
        </section>
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
