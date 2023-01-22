/**
 * requirement:
 * a dropdown menu for selecting the meal category 
 * a number input field for the number of people.
 * 
 */

import React, { useState } from 'react';
import { Form, Select, InputNumber, Button } from 'antd';
import './Step1.css'

interface Props {
  onSubmit: (mealCategory: string, numberOfPeople: number) => void;
}

const Step1: React.FC<Props> = ({ onSubmit }) => {
  const [mealCategory, setMealCategory] = useState<string>('breakfast');
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);

  // const handleMealCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setMealCategory(event.target.value);
  // };

  // const handleNumberOfPeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNumberOfPeople(Number(event.target.value));
  // };

  const handleNumberOfPeopleChange = (value: number | null) => {
    if (value !== null) {
      setNumberOfPeople(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    onSubmit(mealCategory, numberOfPeople);
  };

  return (
    <Form className='global-step' onFinish={handleSubmit}>
      <Form.Item
        rules={[{ required: true, message: 'Please Select a meal' }]}
        label="Please Select a meal:"
        style={{ width: '300px'}}
      >
        <Select value={mealCategory} onChange={setMealCategory}>
          <Select.Option value="breakfast">Breakfast</Select.Option>
          <Select.Option value="lunch">Lunch</Select.Option>
          <Select.Option value="dinner">Dinner</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        rules={[{ required: true}]}
        label="Please Enter Number of People:"
        style={{ width: '600px'}}
      >
        <InputNumber
          min={1}
          max={10}
          value={numberOfPeople}
          onChange={handleNumberOfPeopleChange}
          required
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={!mealCategory || !numberOfPeople}>Next</Button>
      </Form.Item>
    </Form>
  );
};

export default Step1;
