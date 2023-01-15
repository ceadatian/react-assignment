import React from 'react';
import { shallow } from 'enzyme';
import Review from "../src/components/Review/Review";

describe('Review', () => {
  it('should display the correct meal, number of people, restaurant and dishes', () => {
    const selectedMeal = 'lunch';
    const selectedPeople = 4;
    const selectedRestaurant = { id: 1, name: 'Dish 1', restaurant: 'Restaurant 1', availableMeals: ['breakfast'] };
    const selectedDishes = [
      { id: 1, name: 'Dish 1', servings: 2 },
      { id: 2, name: 'Dish 2', servings: 1 },
    ];
    const wrapper = shallow(<Review selectedMeal={selectedMeal} selectedPeople={selectedPeople} selectedRestaurant={selectedRestaurant} selectedDishes={selectedDishes} onBack={() => {}} />);
    expect(wrapper.find('.info-display-value').at(0).text()).toBe(selectedMeal);
    expect(wrapper.find('.info-display-value').at(1).text()).toBe(`${selectedPeople}`);
    expect(wrapper.find('.info-display-value').at(2).text()).toBe(selectedRestaurant.restaurant);
    expect(wrapper.find('.info-display-dishes').children()).toHaveLength(2);
    expect(wrapper.find('.info-display-dishes').childAt(0).text()).toBe(`${selectedDishes[0].name} - ${selectedDishes[0].servings}`);
    expect(wrapper.find('.info-display-dishes').childAt(1).text()).toBe(`${selectedDishes[1].name} - ${selectedDishes[1].servings}`);
  });

  it('should call the onBack prop when the previous button is clicked', () => {
    const onBackMock = jest.fn();
    const wrapper = shallow(<Review selectedMeal={'breakfast'} selectedPeople={1} selectedRestaurant={undefined} selectedDishes={[]} onBack={onBackMock} />);
    wrapper.find('.review-previous').simulate('click');
    expect(onBackMock).toHaveBeenCalled();
  });

  it('should call the onSubmit prop when the submit button is clicked', () => {
    const onSubmitMock = jest.fn();
    const wrapper = shallow(<Review selectedMeal={'breakfast'} selectedPeople={1} selectedRestaurant={undefined} selectedDishes={[]} onSubmit={onSubmitMock} />);
    wrapper.find('.review-submit').simulate('click');
    expect(onSubmitMock).toHaveBeenCalled();
  });
});