import React, { useState } from "react";
import Step1 from "../components/Step1/Step1";
import Step2 from "../components/Step2/Step2";
import Step3 from "../components/Step3/Step3";
import Review from "../components/Review/Review";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import "./Home.css";
import { filterByMeal } from "../utils/utils";

interface Props {
  availableDishes: Dish[];
}

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

interface Restaurant {
  id: string;
  name: string;
}

interface MeadPerson {
  mealCategory: string;
  numberOfPeople: number;
}

const Home: React.FC<Props> = ({ availableDishes }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMeal, setSelectedMeal] = useState<string>("breakfast");
  const [selectedPeople, setSelectedPeople] = useState<number>(0);
  const [filterRestaurant, setFilterRestaurant] = useState<Dish[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Dish>();
  const [selectedDishes, setSelectedDishes] = useState<SelectedDishes[]>([]);
  const [availableDishesForSelection, setAvailableDishesForSelection] =
    useState<SelectedDishes[]>([]);
  // step 1
  const handleMealPersonSelection = (
    mealCategory: string,
    numberOfPeople: number
  ) => {
    setSelectedMeal(mealCategory);
    setSelectedPeople(numberOfPeople);
    const filterRestaurant = filterByMeal(availableDishes, mealCategory);
    setFilterRestaurant(filterRestaurant);
    setCurrentStep(2);
  };
  // step 2
  const handleRestaurantSelection = (selectedRestaurant: Dish) => {
    setSelectedRestaurant(selectedRestaurant);
    const availableDishesForSelection = availableDishes
      .filter(
        (dish) =>
          dish.availableMeals.includes(selectedMeal) &&
          dish.restaurant === selectedRestaurant?.restaurant
      )
      .map((i) => {
        return {
          id: i.id,
          name: i.name,
          servings: 0,
        };
      });
    setAvailableDishesForSelection(availableDishesForSelection);
    setCurrentStep(3);
  };
  // step 3
  const handleDishSelection = (selectedDishes: SelectedDishes[]) => {
    setSelectedDishes(selectedDishes);
    setCurrentStep(4);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      return;
    }
    setCurrentStep(currentStep - 1);
  };
  const onSubmit =() => {
    // call backend api
  }

  return (
    <div className="home">
      <ProgressBar currentStep={currentStep} totalSteps={4} />
      <div className={currentStep === 1 ? "visible" : "hidden"}>
        <Step1 onSubmit={handleMealPersonSelection} />
      </div>
      <div className={currentStep === 2 ? "visible" : "hidden"}>
        <Step2
          availableRestaurants={filterRestaurant}
          onSubmit={handleRestaurantSelection}
          onBack={handleBack}
        />
      </div>
      <div className={currentStep === 3 ? "visible" : "hidden"}>
        <Step3
          availableDishesForSelection={availableDishesForSelection}
          selectedMeal={selectedMeal}
          selectedRestaurant={selectedRestaurant}
          minServings={selectedPeople}
          onSubmit={handleDishSelection}
          onBack={handleBack}
        />
      </div>
      <div className={currentStep === 4 ? "visible" : "hidden"}>
        <Review
          selectedMeal={selectedMeal}
          selectedPeople={selectedPeople}
          selectedRestaurant={selectedRestaurant}
          selectedDishes={selectedDishes}
          onBack={handleBack}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default Home;
