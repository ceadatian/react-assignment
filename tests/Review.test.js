import React from 'react';
import { shallow } from 'enzyme';
import Review from "../src/components/Review/Review";
import { Descriptions } from 'antd'

describe("Review component", () => {
  let wrapper;
  const mockOnSubmit = jest.fn();
  const mockOnBack = jest.fn();
  const selectedMeal = "breakfast";
  const selectedPeople = 2;
  const selectedRestaurant = {
    id: 1,
    name: "restaurant1",
    restaurant: "Restaurant 1",
    availableMeals: ["breakfast", "lunch", "dinner"]
  };
  const selectedDishes = [    
    { id: 1, name: "dish1", servings: 2 },    
    { id: 2, name: "dish2", servings: 1 }  
  ];

  beforeEach(() => {
    wrapper = shallow(
      <Review
        selectedMeal={selectedMeal}
        selectedPeople={selectedPeople}
        selectedRestaurant={selectedRestaurant}
        selectedDishes={selectedDishes}
        onSubmit={mockOnSubmit}
        onBack={mockOnBack}
      />
    );
  });

  it("renders without crashing", () => {
    expect(wrapper).toBeTruthy();
  });

  it("calls the onSubmit function when the submit button is clicked", () => {
    wrapper.find("Button").last().simulate("click");
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
    
    
