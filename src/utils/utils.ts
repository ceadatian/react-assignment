interface Dish {
  id: number;
  name: string;
  restaurant: string;
  availableMeals: string[];
}

export function filterByMeal(data: Dish[], meal: string): Dish[] {
  return data.filter(item => item.availableMeals.includes(meal));
}
