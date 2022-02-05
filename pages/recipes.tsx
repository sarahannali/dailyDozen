import React, { ReactElement } from 'react';
import { getAllRecipeData } from '../lib';
import { Recipe } from '../utils/propTypes';
import AppLayout from '../components/layout';
import Recipes from '../components/pages/recipes/Recipes';

export const getStaticProps = async () => {
  const allRecipeData = await getAllRecipeData();

  return {
    props: {
      allRecipeData,
    },
  };
};

type RecipesPageProps = {
  allRecipeData: Recipe[],
}

export default function RecipesPage({ allRecipeData }: RecipesPageProps) {
  return <Recipes recipes={allRecipeData} />;
}

RecipesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  );
};
