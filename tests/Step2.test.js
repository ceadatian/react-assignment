import React from "react";
import { shallow } from "enzyme";
import Step2 from "../src/components/Step2/Step2";

describe("Step2 component", () => {
  it("renders correctly", () => {
    const wrapper = shallow(
      <Step2 availableRestaurants={[]} onSubmit={() => {}} onBack={() => {}} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onSubmit function with correct argument when form is submitted", () => {
    const onSubmit = jest.fn();
    const availableRestaurants = [
      {
        id: 1,
        name: "Dish 1",
        restaurant: "Restaurant 1",
        availableMeals: ["breakfast"],
      },
      {
        id: 2,
        name: "Dish 2",
        restaurant: "Restaurant 2",
        availableMeals: ["lunch"],
      },
      {
        id: 3,
        name: "Dish 3",
        restaurant: "Restaurant 3",
        availableMeals: ["dinner"],
      },
    ];
    const wrapper = shallow(
      <Step2
        availableRestaurants={availableRestaurants}
        onSubmit={onSubmit}
        onBack={() => {}}
      />
    );
    const restaurantSelect = wrapper.find("select");
    restaurantSelect.simulate("change", { target: { value: "2" } });
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });
    expect(onSubmit).toHaveBeenCalledWith({
      id: 2,
      name: "Dish 2",
      restaurant: "Restaurant 2",
      availableMeals: ["lunch"],
    });
  });

  it("should call onBack function when the back button is clicked", () => {
    const onBack = jest.fn();
    const wrapper = shallow(
      <Step2 availableRestaurants={[]} onSubmit={() => {}} onBack={onBack} />
    );
    wrapper.find("button.global-previous").simulate("click");
    expect(onBack).toHaveBeenCalled();
  });

  it("should disable the submit button when no restaurant is selected", () => {
    const wrapper = shallow(
      <Step2 availableRestaurants={[]} onSubmit={() => {}} onBack={() => {}} />
    );
    expect(wrapper.find('button[type="submit"]').prop("disabled")).toBe(true);
    wrapper.setProps({
      availableRestaurants: [
        {
          id: 1,
          name: "Dish 1",
          restaurant: "Restaurant 1",
          availableMeals: ["breakfast"],
        },
      ],
    });
    expect(wrapper.find('button[type="submit"]').prop("disabled")).toBe(true);
    wrapper.find("select").simulate("change", { target: { value: "1" } });
    expect(wrapper.find('button[type="submit"]').prop("disabled")).toBe(false);
  });
});
