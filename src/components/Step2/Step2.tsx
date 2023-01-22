/**
 * requirement
 * a dropdown menu for selecting the restaurant based on the meal category selected in step 1.
 * pass the selected restaurant data to the next step.
 */

import React, { useState } from 'react';
import { Form, Select, Button } from 'antd';
import './Step2.css'

interface Props {
  availableRestaurants: Restaurant[];
  onSubmit: (selectedRestaurant: Restaurant) => void;
	onBack: () => void;
}

interface Restaurant {
  id: number;
  name: string;
  restaurant: string;
  availableMeals: string[];
}

const Step2: React.FC<Props> = ({ availableRestaurants, onSubmit, onBack }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | undefined>();

	// const handleRestaurantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedRestaurantId = event.target.value;
  //   const selectedRestaurant = availableRestaurants.find(
  //     (restaurant) => restaurant.id === +selectedRestaurantId
  //   );
  //   setSelectedRestaurant(selectedRestaurant);
  // };
  const handleRestaurantChange = (value: string) => {
    const selectedRestaurantId = value;
    const selectedRestaurant = availableRestaurants.find(
      (restaurant) => restaurant.id === +selectedRestaurantId
    );
    setSelectedRestaurant(selectedRestaurant);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    if (selectedRestaurant) {
      onSubmit(selectedRestaurant);
    }
  };

  const uniqueRestaurants = availableRestaurants.filter((item, index, self) => self.map(i => i.restaurant).indexOf(item.restaurant) === index);

  return (
    <Form className='global-step' onFinish={handleSubmit}>
      <Form.Item label="Please Select a Restaurant:" name="selectedRestaurantId" style={{ width: '400px'}}>
        <Select onChange={handleRestaurantChange}>
          <Select.Option value="">Please Select a Restaurant</Select.Option>
          {uniqueRestaurants.map((restaurant) => (
            <Select.Option key={restaurant.id} value={restaurant.id}>
              {restaurant.restaurant}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
			<Form.Item>
        <Button className='global-previous' onClick={onBack}>Previous</Button>
        <Button type="primary" htmlType="submit" disabled={!selectedRestaurant}>Next</Button>
      </Form.Item>
    </Form>
  );
};

export default Step2;
