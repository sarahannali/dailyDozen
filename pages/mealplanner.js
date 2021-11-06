import { getAllRecipeData } from '../lib/recipes';
import { getCurrentWeekMealEvents } from '../lib/mealEvents';
import { getAllIngredientData } from '../lib/ingredients';
import MealPlanner from '../components/mealplanner/MealPlanner';

export const getStaticProps = async () => {
  const allRecipeData = await getAllRecipeData()
  const currentWeekMealEvents = await getCurrentWeekMealEvents();
  const allIngredientData = await getAllIngredientData();

  return {
    props: {
      allRecipeData,
      currentWeekMealEvents,
      allIngredientData
    }
  }
};

export default function RecipesPage({allRecipeData, currentWeekMealEvents, allIngredientData}) {
  return <MealPlanner
    allRecipeData={allRecipeData}
    currentWeekMealEvents={currentWeekMealEvents}
    allIngredientData={allIngredientData}
  />
}