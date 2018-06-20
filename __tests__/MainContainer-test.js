import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MainContainer } from "../app/components/MainContainer";
import testData from "./data/response";
import items from "./data/items";

Enzyme.configure({ adapter: new Adapter() });

describe("MainContainer", function() {
  let renderedComponent;
  const mockFunc = jest.fn();

  beforeEach(() => {
    const props = {
      initFetchItems: mockFunc,
      items: items,
      requestStatus: ""
    };

    renderedComponent = shallow(<MainContainer {...props} />);
  });

  it("Renders correctly from supplied props", function() {
    expect(renderedComponent.exists()).toBeTruthy();
  });

  it("Updates the selected day", function() {
    const testIndex = 1;
    const dayTab = renderedComponent.find(".day-tab").at(testIndex);

    expect(renderedComponent.state("selectedDay")).toEqual(null);
    dayTab.simulate("click", {});

    expect(renderedComponent.state("selectedDay")).toEqual(
      Object.keys(items)[testIndex]
    );
  });
});
