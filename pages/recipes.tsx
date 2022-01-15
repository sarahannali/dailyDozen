import React, { ReactElement } from 'react';
import { getAllRecipeData, getNutritionGoalData } from '../lib';
import Recipes from '../components/recipes/Recipes';
import { NutritionGoals, Recipe } from '../utils/propTypes';
import AppLayout from '../components/layout';

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
  allRecipeData: Recipe[],
  nutritionGoalData: NutritionGoals
}

export default function RecipesPage({ allRecipeData, nutritionGoalData }: RecipesPageProps) {
  return <Recipes recipes={allRecipeData} nutritionGoalData={nutritionGoalData} />;
}

RecipesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  );
};
