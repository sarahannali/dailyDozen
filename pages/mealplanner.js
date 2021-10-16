import { getAllRecipeData } from '../lib/recipes';
import { getCurrentWeekMealEvents } from '../lib/mealEvents';
import MealPlanner from '../components/mealplanner/MealPlanner';

export const getStaticProps = async () => {
  const allRecipeData = await getAllRecipeData()
  const currentWeekMealEvents = await getCurrentWeekMealEvents();

  return {
    props: {
      allRecipeData,
      currentWeekMealEvents
    }
  }
};

export default function RecipesPage({allRecipeData, currentWeekMealEvents}) {
  return <MealPlanner allRecipeData={allRecipeData} currentWeekMealEvents={currentWeekMealEvents} />
}