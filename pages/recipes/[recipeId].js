import { useRouter } from 'next/router';
import RecipeInfo from '../../components/recipes/RecipeInfo';
import { getAllRecipeData, getRecipeData } from '../../lib/recipes';

export async function getStaticPaths() {
  const allRecipeData = await getAllRecipeData()

  const paths = allRecipeData.map((recipe) => {
    return {
      params: {
        recipeId: recipe.id,
      }
    }
  });

  return {
    paths,
    fallback: false
  }
};

export async function getStaticProps({ params }) {
  const recipe = await getRecipeData(params.recipeId);
  
  return {
    props: {
      recipe
    }
  }
};

const RecipeInfoPage = ({recipe}) => {
  return <RecipeInfo recipe={recipe}/>
};

export default RecipeInfoPage
