import { getAllRecipeData } from '../lib/recipes';
import { getCurrentWeekMealEvents } from '../lib/mealEvents';
import { getAllIngredientData } from '../lib/ingredients';
import { getAllNutritionGoalInfo } from '../lib/goals';
import MealPlanner from '../components/mealplanner/MealPlanner';

export const getStaticProps = async () => {
  const allRecipeData = await getAllRecipeData()
  const currentWeekMealEvents = await getCurrentWeekMealEvents();
  const allIngredientData = await getAllIngredientData();
  const allNutritionData = await getAllNutritionGoalInfo();

  return {
    props: {
      allRecipeData,
      currentWeekMealEvents,
      allIngredientData,
      allNutritionData
    }
  }
};

export default function RecipesPage({allRecipeData, currentWeekMealEvents, allIngredientData, allNutritionData}) {
  return <MealPlanner
    allRecipeData={allRecipeData}
    currentWeekMealEvents={currentWeekMealEvents}
    allIngredientData={allIngredientData}
    allNutritionData={allNutritionData}
  />
}