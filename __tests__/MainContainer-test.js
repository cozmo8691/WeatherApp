import React from "react";
import { Provider, connect } from "react-redux";
import store from "../app/store";
import { mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

import { MainContainer } from "../app/components/MainContainer";
import testData from "./data/response";
import { initFetchItems } from "../app/actions/actions";

describe("MainContainer", function() {
  let wrapper;
  let TestMainContainer;
  let mockResponse;

  beforeAll(function() {
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

    TestMainContainer = connect(mapStateToProps, mapDispatchToProps)(
      MainContainer
    );
  });

  beforeEach(function() {
    mockResponse = (status, statusText, response) => {
      return new window.Response(response, {
        status: status,
        statusText: statusText,
        headers: {
          "Content-type": "application/json"
        }
      });
    };

    window.fetch = jest.fn().mockImplementation(
      () => Promise.resolve(mockResponse(200, null, JSON.stringify(testData)))
      //Promise.reject(mockResponse(500, null, null))
    );

    wrapper = mount(
      <Provider store={store}>
        <TestMainContainer />
      </Provider>
    );
  });

  test("Bootstraps with remote data", async function() {
    await wrapper.update();
    const items = store.getState().itemsState.items;
    expect(Object.keys(items).length).toEqual(6);
  });
});
