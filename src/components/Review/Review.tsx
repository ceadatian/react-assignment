/**
 * requirement:
 * a review of all the previous choices made by the user. The user can edit their choices or submit the form.
 */

import React from "react";
import { Descriptions, Button } from "antd";
import "./Review.css"

interface Dish {
  id: number;
  name: string;
  restaurant: string;
  availableMeals: string[];
}

interface SelectedDishes {
  id: number;
  name: string;
  servings: number;
}

interface Props {
  selectedMeal: string;
  selectedPeople: number;
  selectedRestaurant: Restaurant | undefined;
  selectedDishes: SelectedDishes[];
  onSubmit: () => void;
  onBack: () => void;
}

interface Restaurant {
  id: number;
  name: string;
  restaurant: string;
  availableMeals: string[];
}

const Review: React.FC<Props> = ({
  selectedMeal,
  selectedPeople,
  selectedRestaurant,
  selectedDishes,
  onSubmit,
  onBack
}) => {
  const Submit = () => {
    console.log({
      selectedMeal,
      selectedPeople,
      restaurant: selectedRestaurant?.restaurant || '',
      dishes: selectedDishes
    });
    onSubmit();
  };
    
  return (
    <div className='global-step'>
      <Descriptions title="Review" bordered>
        <Descriptions.Item label="Meal">{selectedMeal}</Descriptions.Item>
        <Descriptions.Item label="No. of People">{selectedPeople}</Descriptions.Item>
        <Descriptions.Item label="Restaurant">{selectedRestaurant?.restaurant || ''}</Descriptions.Item>
        <Descriptions.Item label="Dishes">
          {selectedDishes.map((dish, idx) => (
            <div key={idx}>
              {dish.name} - {dish.servings}
            </div>
          ))}
        </Descriptions.Item>
      </Descriptions>
      <div className="review-bottom">
        <Button className="global-previous" onClick={onBack}>Previous</Button>
        <Button type="primary" onClick={Submit}>Submit</Button>
      </div>
    </div>
  );
};
export default Review;
