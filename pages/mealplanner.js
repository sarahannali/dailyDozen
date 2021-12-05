import { getAllRecipeData } from '../lib/recipes';
import { getMealEvents } from '../lib/mealEvents';
import { getNutritionGoalInfo } from '../lib/goals';
import MealPlanner from '../components/mealplanner/MealPlanner';

export const getStaticProps = async () => {
  const allRecipeData = await getAllRecipeData()
  const currentWeekMealEvents = await getMealEvents(new Date().toDateString());
  const allNutritionData = await getNutritionGoalInfo();

  return {
    props: {
      allRecipeData,
      currentWeekMealEvents,
      allNutritionData
    }
  }
};

export default function RecipesPage({allRecipeData, currentWeekMealEvents, allNutritionData}) {
  return <MealPlanner
    allRecipeData={allRecipeData}
    currentWeekMealEvents={currentWeekMealEvents}
    allNutritionData={allNutritionData}
  />
}