import { getAllRecipeData } from '../lib/recipes'
import MealPlanner from '../components/mealplanner/MealPlanner';

export const getStaticProps = async () => {
  const allRecipeData = await getAllRecipeData()

  return {
    props: {
      allRecipeData
    }
  }
};

export default function RecipesPage({allRecipeData}) {
  console.log("ALL RECIPE DATA: " + allRecipeData);
  return <MealPlanner allRecipeData={allRecipeData} />
}