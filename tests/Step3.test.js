import React from "react";
import { shallow } from "enzyme";
import Step3 from "../src/components/Step3/Step3";

describe("Step3 component", () => {
  let wrapper;
  const mockOnSubmit = jest.fn();
  const mockOnBack = jest.fn();
  const availableDishesForSelection = [{ id: 1, name: "Dish 1" }, { id: 2, name: "Dish 2" }];
  const selectedMeal = "breakfast";
  const selectedRestaurant = { id: 1, restaurant: "Restaurant 1" };
  const minServings = 1;
  
  beforeEach(() => {
    wrapper = shallow(
      <Step3
          availableDishesForSelection={availableDishesForSelection}
          selectedMeal={selectedMeal}
          selectedRestaurant={selectedRestaurant}
          onSubmit={mockOnSubmit}
          onBack={mockOnBack}
          minServings={minServings}
      />
    );
  });
  
  it("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });
  
});
    
   
  
  
  