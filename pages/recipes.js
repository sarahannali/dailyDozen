import { getAllRecipeData } from '../lib/recipes';
import { getNutritionGoalData } from '../lib/goals';
import Recipes from '../components/recipes/Recipes';

export const getStaticProps = async () => {
  const allRecipeData = await getAllRecipeData()
  const nutritionGoalData = await getNutritionGoalData();

  return {
    props: {
      allRecipeData,
      nutritionGoalData
    }
  }
};

export default function RecipesPage({allRecipeData, nutritionGoalData}) {
  return <Recipes recipes={allRecipeData} nutritionGoalData={nutritionGoalData} />
}