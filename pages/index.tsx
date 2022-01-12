import React from 'react';
import type { ReactElement } from 'react';
import {
  getAllRecipeData, getMealEvents, getNutritionGoalData, getGroceryList,
} from '../lib';
import MealPlanner from '../components/mealplanner/MealPlanner';
import {
  NutritionGoals, Recipe, MealEvent, GroceryItem,
} from '../utils/propTypes';
import AppLayout from '../components/layout';

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
  allRecipeData: Array<Recipe>,
  currentWeekMealEvents: Array<MealEvent>,
  nutritionGoalData: Array<NutritionGoals>,
  groceryList: Array<GroceryItem>
}

export default function MealPlannerPage({
  allRecipeData, currentWeekMealEvents, nutritionGoalData, groceryList,
}: MealPlannerPageProps) {
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
