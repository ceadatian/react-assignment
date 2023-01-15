import React from "react";
import { shallow } from "enzyme";
import Home from "../src/pages/Home";


describe("Home component", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Home availableDishes={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
