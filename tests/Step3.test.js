import React from "react";
import { shallow } from "enzyme";
import Step3 from "../src/components/Step3/Step3";

describe("<Step3 />", () => {
  it("should render a select element for each dish", () => {
    const availableDishesForSelection = [];

    const wrapper = shallow(
      <Step3 availableDishesForSelection={availableDishesForSelection} />
    );

    expect(wrapper.find("select")).toHaveLength(0);
  });

  it("should call the onBack function when the back button is clicked", () => {
    const onBack = jest.fn();
    const availableDishesForSelection = [
      { id: 1, name: "Dish 1" , servings: 1},
      { id: 2, name: "Dish 2" , servings: 1},
      { id: 3, name: "Dish 3" , servings: 1},
    ];
    const wrapper = shallow(
      <Step3
        onBack={onBack}
        availableDishesForSelection={availableDishesForSelection}
      />
    );

    wrapper.find(".global-previous").simulate("click");

    expect(onBack).toHaveBeenCalled();
  });
});
