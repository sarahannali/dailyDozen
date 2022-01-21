import React, { useContext } from 'react';
import type { ReactElement } from 'react';
import {
  getAllRecipeData, getMealEvents, getNutritionGoalData, getGroceryList,
} from '../lib';
import MealPlanner from '../components/mealplanner/MealPlanner';
import {
  NutritionGoalsWithMacros, Recipe, GroceryItem, MealEventResponse,
} from '../utils/propTypes';
import AppLayout from '../components/layout';
import { AuthContext } from '../components/contexts/AuthContext';

export const getStaticProps = async () => {
  const allRecipeData = await getAllRecipeData();
  const currentWeekMealEvents = await getMealEvents(new Date().toDateString());
  const nutritionGoalData = await getNutritionGoalData();
  const groceryList = await getGroceryList();

  return {
    props: {
      allRecipeData,
      currentWeekMealEvents,
      nutritionGoalData,
      groceryList,
    },
  };
};

interface MealPlannerPageProps {
  allRecipeData: Recipe[],
  currentWeekMealEvents: MealEventResponse[],
  nutritionGoalData: NutritionGoalsWithMacros,
  groceryList: GroceryItem[]
}

export default function MealPlannerPage({
  allRecipeData, currentWeekMealEvents, nutritionGoalData, groceryList,
}: MealPlannerPageProps) {
  const [user, setUser] = useContext(AuthContext);
  console.log(user);

  return (
    <MealPlanner
      allRecipeData={allRecipeData}
      currentWeekMealEvents={currentWeekMealEvents}
      nutritionGoalData={nutritionGoalData}
      groceryList={groceryList}
    />
  );
}

MealPlannerPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  );
};
