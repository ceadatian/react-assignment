import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import Step1 from "../src/components/Step1/Step1";

configure({ adapter: new Adapter() });
describe('Step1 component', () => {
  let wrapper;
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Step1 onSubmit={mockOnSubmit} />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('renders a Select component', () => {
    expect(wrapper.find('#ant-select')).toHaveLength(1);
  });

  it('renders a InputNumber component', () => {
    expect(wrapper.find('InputNumber')).toHaveLength(1);
  });

  it('renders a Button component', () => {
    expect(wrapper.find('Button')).toHaveLength(1);
  });

  it('calls the onSubmit function when the form is submitted', () => {
    wrapper.find('#ant-form1').simulate('finish');
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('calls the onSubmit function with the correct arguments', () => {
    wrapper.find('#ant-select').simulate('change', 'lunch');
    wrapper.find('InputNumber').simulate('change', 5);
    wrapper.find('#ant-form1').simulate('finish');
    expect(mockOnSubmit).toHaveBeenCalledWith('lunch', 5);
  });

  it('disables the button when the form is not filled out', () => {
    expect(wrapper.find('Button').prop('disabled')).toBeTruthy();
  });

  it('enables the button when the form is filled out', () => {
    wrapper.find('#ant-select').simulate('change', { target: { value: 'lunch' } });
    wrapper.find('InputNumber').simulate('change', { target: { value: 5 } });
    expect(wrapper.find('Button').prop('disabled')).toBeFalsy();
  });
});
