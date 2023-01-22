import React from "react";
import { shallow } from "enzyme";
import Step2 from "../src/components/Step2/Step2";

describe('Step2 component', () => {
  let wrapper;
  let mockOnSubmit;
	let mockOnBack;
  const availableRestaurants = [   
    {      
      id: 1,      
      name: 'John Doe',      
      restaurant: 'Burger King',      
      availableMeals: ['breakfast', 'lunch', 'dinner']
    },
    {
      id: 2,
      name: 'Jane Smith',
      restaurant: 'KFC',
      availableMeals: ['lunch', 'dinner']
    },
    {
      id: 3,
      name: 'Bob Lee',
      restaurant: 'Pizza Hut',
      availableMeals: ['dinner']
    },
  ];

  beforeEach(() => {
    mockOnSubmit = jest.fn();
		mockOnBack = jest.fn();
    wrapper = shallow(<Step2 availableRestaurants={availableRestaurants} onSubmit={mockOnSubmit} onBack={mockOnBack} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders a Select component', () => {
    expect(wrapper.find('#ant-select2')).toHaveLength(1);
  });

  it('renders a Button component', () => {
    expect(wrapper.find('Button')).toHaveLength(2);
  });

  it('calls the onSubmit function when the form is submitted', () => {
    wrapper.find('#ant-select2').simulate('change', '1');
    wrapper.find('#ant-form2').simulate('finish');
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('calls the onSubmit function with the correct arguments', () => {
    wrapper.find('#ant-select2').simulate('change', '1');
    wrapper.find('#ant-form2').simulate('finish');
    expect(mockOnSubmit).toHaveBeenCalledWith(availableRestaurants[0]);
  });

  it('disables the button when the form is not filled out', () => {
    expect(wrapper.find('Button').at(1).prop('disabled')).toBeTruthy();
  });

  it('enables the button when the form is filled out', () => {
    wrapper.find('#ant-select2').simulate('change', '1');
    expect(wrapper.find('Button').at(1).prop('disabled')).toBeFalsy();
  });
  
  it('calls onBack function when the back button is clicked', () => {
    wrapper.find('Button').at(0).simulate('click');
    expect(mockOnBack).toHaveBeenCalled();
  });
});
