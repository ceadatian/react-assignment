import React from "react";
import { shallow } from "enzyme";
import Step1 from "../src/components/Step1/Step1";

describe("Step1 component", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<Step1 onSubmit={() => {}} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onSubmit function with correct arguments when form is submitted", () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<Step1 onSubmit={onSubmit} />);
    wrapper.find("select").simulate("change", { target: { value: "lunch" } });
    wrapper.find("input").simulate("change", { target: { value: "5" } });
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });

    expect(onSubmit).toHaveBeenCalledWith("lunch", 5);
  });

  it("should disable the submit button when meal category or number of people is not selected", () => {
    const wrapper = shallow(<Step1 onSubmit={() => {}} />);
    expect(wrapper.find("button").prop("disabled")).toBe(true);

    wrapper.find("select").simulate("change", { target: { value: "lunch" } });
    expect(wrapper.find("button").prop("disabled")).toBe(true);

    wrapper.find("input").simulate("change", { target: { value: "5" } });
    expect(wrapper.find("button").prop("disabled")).toBe(false);
  });
});
