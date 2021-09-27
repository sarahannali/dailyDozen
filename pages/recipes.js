import { getRecipeData } from '../lib/recipes'
import Recipes from '../components/recipes/Recipes';
import RecipeInfo from '../components/recipes/RecipeInfo';
import { Modal } from 'antd';
import { useRouter } from 'next/router';

export const getStaticProps = async () => {
  const allRecipeData = await getRecipeData()
  return {
    props: {
      allRecipeData
    }
  }
}


export default function RecipesPage({allRecipeData}) {
  const router = useRouter()

  return (<>
      <Modal
        visible={!!router.query.recipeId}
        onCancel={() => router.push('/recipes')}
        footer={null}
      >
        <RecipeInfo
          id={router.query.recipeId}
        />
      </Modal>
    <Recipes recipes={allRecipeData} />
  </>);
}