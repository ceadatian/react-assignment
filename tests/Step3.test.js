import React from "react";
import { shallow } from "enzyme";
import Step3 from "../src/components/Step3/Step3";

describe('Step3', () => {
  let wrapper;
  let onSubmitMock;
  let onBackMock;
  const availableDishesForSelection = [
    { id: 1, name: 'Dish 1', servings: 1 },
    { id: 2, name: 'Dish 2', servings: 1 }
  ];
  const selectedMeal = 'Lunch';
  const selectedRestaurant = { id: 1, name: 'Restaurant 1', availableMeals: ['Lunch'] };
  const minServings = 1;
  
  beforeEach(() => {
    onSubmitMock = jest.fn();
    onBackMock = jest.fn();
    wrapper = shallow(
      <Step3 
        availableDishesForSelection={availableDishesForSelection}
        selectedMeal={selectedMeal}
        selectedRestaurant={selectedRestaurant}
        onSubmit={onSubmitMock}
        onBack={onBackMock}
        minServings={minServings}
      />
    );
    console.log(wrapper.debug())
  });

  it("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });

  it('calls onSubmit with the selected dishes when form is submitted', () => {
    wrapper.find('#ant-form3').simulate('finish');
    expect(onSubmitMock).toHaveBeenCalled();
  });
  it('calls onBack when the back button is clicked', () => {
    wrapper.find('#back3').simulate('click');
    expect(onBackMock).toHaveBeenCalled();
  });
  it('add new dishes to the selectedDishes state when add button is clicked', () => {
    wrapper.find('#add3').simulate('click');
    expect(wrapper.find('.selected-dishes')).toHaveLength(1);
  });
});
