import React, { useState, useEffect } from "react";
import "./Step3.css"

interface Props {
  availableDishesForSelection: SelectedDish[];
  selectedMeal: string;
  selectedRestaurant: Dish | undefined;
  onSubmit: (selectedDishes: SelectedDish[]) => void;
  onBack: () => void;
  minServings: number;
}

interface Dish {
  id: number;
  name: string;
  restaurant: string;
  availableMeals: string[];
}

interface SelectedDish {
  id: number;
  name: string;
  servings: number;
}

const Step3: React.FC<Props> = ({
  minServings,
  availableDishesForSelection,
  selectedMeal,
  selectedRestaurant,
  onSubmit,
  onBack,
}) => {
  const [selectedDishes, setSelectedDishes] = useState<SelectedDish[]>([]);
  const [totalServings, setTotalServings] = useState(0);
  useEffect(() => {
    if (availableDishesForSelection.length > 0) {
      setSelectedDishes([
        {
          id: availableDishesForSelection[0].id,
          name: availableDishesForSelection[0].name,
          servings: 0,
        },
      ]);
    }
  }, [availableDishesForSelection]);
  // useEffect(() => {
  //   setTotalServings(minServings);
  // }, [minServings]);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    idx: number
  ) => {
    const selectedDish = event.target.value;
    const selectedDishObject = availableDishesForSelection.find(
      (dish) => dish.name === selectedDish
    );
    const newSelectedDishes = [...selectedDishes];
    newSelectedDishes[idx].id = selectedDishObject?.id || -1;
    newSelectedDishes[idx].name = selectedDish;
    setSelectedDishes(newSelectedDishes);

    // const newAvailableDishes = availableDishesForSelection.filter(
    //   (dish) => dish.name !== selectedDish
    // );
    // setLeftDishes(newAvailableDishes);
  };

  const handleServingsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const newServings = Number(event.target.value);
    const newSelectedDishes = [...selectedDishes];
    newSelectedDishes[idx].servings = newServings;
    setSelectedDishes(newSelectedDishes);
    setTotalServings(
      selectedDishes.reduce((acc, dish) => acc + dish.servings, 0)
    );
  };

  const handleAddClick = () => {
    setSelectedDishes([...selectedDishes, { id: 0, name: "", servings: 0 }]);
  };

  const handleRemoveClick = (idx: number) => {
    const removedDish = selectedDishes[idx];
    const newSelectedDishes = [
      ...selectedDishes.slice(0, idx),
      ...selectedDishes.slice(idx + 1),
    ];
    setSelectedDishes(newSelectedDishes);
    // setLeftDishes([...leftDishes, removedDish]);
    let servings = 0;
    newSelectedDishes.forEach((i) => {
      servings += i.servings;
    });
    setTotalServings(servings);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(selectedDishes);
  };

  const renderSelect = (dish: SelectedDish, idx: number) => (
    <div key={idx}>
      <label className="global-label">
        Select Dish:
        <select
          value={dish.name}
          onChange={(event) => handleSelectChange(event, idx)}
        >
          <option value="">please select a dish</option>
          {availableDishesForSelection.map((dish, idx) => (
            <option
              key={dish.id}
              value={dish.name}
              disabled={selectedDishes.some(
                (selectedDish) => selectedDish.name === dish.name
              )}
            >
              {dish.name}
            </option>
          ))}
        </select>
      </label>
      <label className="global-label">
        Select no. of Servings
        <input
          type="number"
          min={1}
          max={10}
          value={dish.servings}
          onChange={(event) => handleServingsChange(event, idx)}
        />
      </label>
      {
        selectedDishes.length > 1 && (
          <button onClick={() => handleRemoveClick(idx)}>Remove</button>
        )
      }
    </div>
  );

  return (
    <form className="global-step" onSubmit={handleSubmit}>
      <h3>
        Select dishes for {selectedMeal} at {selectedRestaurant?.restaurant}:
      </h3>
      <div>
        {selectedDishes.map((dish, idx) => renderSelect(dish, idx))}
        <br />

        <button
          disabled={selectedDishes.length >= availableDishesForSelection.length}
          onClick={handleAddClick}
        >
          Add Dish
        </button>
      </div>
      <br />
      <br />
      <br />
      <p>
      The total number of dishes should be greater or equal to the number of people selected and maximum of 10
      </p>
      <p>
        Total Servings:{" "}
        <span
          className={
            totalServings < minServings || totalServings > 10
              ? "global-warn"
              : ""
          }
        >
          {totalServings}
        </span>
        / Min: {minServings} / Max: 10
      </p>
      <br />
      <button className="global-previous" type="button" onClick={onBack}>
        Previous
      </button>
      <button
        type="submit"
        disabled={
          totalServings < minServings ||
          totalServings > 10 ||
          selectedDishes.some((dish) => dish.name === "")
        }
      >
        Next
      </button>
    </form>
  );
};

export default Step3;
