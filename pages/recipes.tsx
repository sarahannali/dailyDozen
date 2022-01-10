import { getAllRecipeData } from '../lib/recipes';
import { getNutritionGoalData } from '../lib/goals';
import Recipes from '../components/recipes/Recipes';
import { Recipe } from '../utils/propTypes';

export const getStaticProps = async () => {
  const allRecipeData = await getAllRecipeData();
  const nutritionGoalData = await getNutritionGoalData();

  return {
    props: {
      allRecipeData,
      nutritionGoalData,
    },
  };
};

type RecipesPageProps = {
  allRecipeData: Array<Recipe>,
  nutritionGoalData: Array<
}

export default function RecipesPage({ allRecipeData, nutritionGoalData }: RecipesPageProps) {
  return <Recipes recipes={allRecipeData} nutritionGoalData={nutritionGoalData} />;
}
