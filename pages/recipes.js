import { getAllRecipeData } from '../lib/recipes'
import Recipes from '../components/recipes/Recipes';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
import RecipeInfoPage from './recipes/[recipeId]';

export const getStaticProps = async () => {
  const allRecipeData = await getAllRecipeData()

  return {
    props: {
      allRecipeData
    }
  }
};

export default function RecipesPage({allRecipeData}) {
  return <Recipes recipes={allRecipeData} />
}