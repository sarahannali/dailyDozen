import { getAllRecipeData } from '../lib/recipes';
import { getMealEvents } from '../lib/mealEvents';
import { getNutritionGoalData } from '../lib/goals';
import MealPlanner from '../components/mealplanner/MealPlanner';

export const getStaticProps = async () => {
  const allRecipeData = await getAllRecipeData()
  const currentWeekMealEvents = await getMealEvents(new Date().toDateString());
  const nutritionGoalData = await getNutritionGoalData();

  return {
    props: {
      allRecipeData,
      currentWeekMealEvents,
      nutritionGoalData
    }
  }
};

export default function RecipesPage({allRecipeData, currentWeekMealEvents, nutritionGoalData}) {
  return <MealPlanner
    allRecipeData={allRecipeData}
    currentWeekMealEvents={currentWeekMealEvents}
    nutritionGoalData={nutritionGoalData}
  />
}