import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Forecast from "../app/components/Forecast";

Enzyme.configure({ adapter: new Adapter() });

import items from "./data/items";

describe("Forecast", function() {
  let renderedComponent;

  const dayKey = Object.keys(items)[0];
  const dayForecast = items[dayKey];

  beforeEach(() => {
    const props = {
      dayForecast
    };

    renderedComponent = shallow(<Forecast {...props} />);
  });

  it("Renders correctly from supplied props", function() {
    expect(renderedComponent.exists()).toBeTruthy();
  });
});
