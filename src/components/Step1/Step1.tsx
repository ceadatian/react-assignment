/**
 * requirement:
 * a dropdown menu for selecting the meal category 
 * a number input field for the number of people.
 * 
 */

import React, { useState } from 'react';
import './Step1.css'

interface Props {
  onSubmit: (mealCategory: string, numberOfPeople: number) => void;
}

const Step1: React.FC<Props> = ({ onSubmit }) => {
  const [mealCategory, setMealCategory] = useState<string>('breakfast');
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);

  const handleMealCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMealCategory(event.target.value);
  };

  const handleNumberOfPeopleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfPeople(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(mealCategory, numberOfPeople);
  };

  return (
    <form className='global-step' onSubmit={handleSubmit}>
      <label className='global-label'>
        Please Select a meal:
        <select value={mealCategory} onChange={handleMealCategoryChange}>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
      </label>
      <br />
      <label className='global-label'>
        Please Enter Number of People:
        <input
          type="number"
          min={1}
          max={10}
          value={numberOfPeople}
          onChange={handleNumberOfPeopleChange}
          required
        />
      </label>
      <br />
      <button type="submit" disabled={!mealCategory || !numberOfPeople}>Next</button>
    </form>
  );
};

export default Step1;
