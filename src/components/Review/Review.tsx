/**
 * requirement:
 * a review of all the previous choices made by the user. The user can edit their choices or submit the form.
 */

import React from "react";
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
    <div className="info-display-container">
      <div className="info-display-row">
        <div className="info-display-label">Meal:</div>
        <div className="info-display-value">{selectedMeal}</div>
      </div>
      <div className="info-display-row">
        <div className="info-display-label">No. of People:</div>
        <div className="info-display-value">{selectedPeople}</div>
      </div>
      <div className="info-display-row">
        <div className="info-display-label">Restaurant:</div>
        <div className="info-display-value">{selectedRestaurant?.restaurant || ''}</div>
      </div>
      <div className="info-display-row">
        <div className="info-display-label">Dishes:</div>
        <div className="info-display-dishes">
          {selectedDishes.map((dish, idx) => (
            <div key={idx}>
              {dish.name} - {dish.servings}
            </div>
          ))}
        </div>
      </div>
      <br />
      <button className="global-previous review-previous" type="button" onClick={onBack}>
        Previous
      </button>
      <button className="global-previous review-submit"  type="submit" onClick={Submit}>
        Submit
      </button>
    </div>
  );
};
export default Review;
