/**
 * requirement
 * a dropdown menu for selecting the restaurant based on the meal category selected in step 1.
 * pass the selected restaurant data to the next step.
 */

import React, { useState } from 'react';
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

	const handleRestaurantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRestaurantId = event.target.value;
    const selectedRestaurant = availableRestaurants.find(
      (restaurant) => restaurant.id === +selectedRestaurantId
    );
    setSelectedRestaurant(selectedRestaurant);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedRestaurant) {
      onSubmit(selectedRestaurant);
    }
  };

  const uniqueRestaurants = availableRestaurants.filter((item, index, self) => self.map(i => i.restaurant).indexOf(item.restaurant) === index);

  return (
    <form className='global-step' onSubmit={handleSubmit}>
      <label className='global-label'>
				Please Select a Restaurant:
        <select value={selectedRestaurant?.id || ''} onChange={handleRestaurantChange}>
          <option value="">Please Select a Restaurant</option>
          {uniqueRestaurants.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.restaurant}
            </option>
          ))}
        </select>
      </label>
      <br />
			<button className="global-previous" type="button" onClick={onBack}>
        Previous
      </button>
      <button type="submit" disabled={!selectedRestaurant}>
        Next
      </button>
    </form>
  );
};

export default Step2;
