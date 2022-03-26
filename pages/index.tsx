import React from 'react';
import type { ReactElement } from 'react';
import { Recipe } from 'utils/propTypes/db';
import getAllRecipeData from '../lib/recipes';
import AppLayout from '../components/layout';
import MealPlanner from '../components/pages/mealplanner/MealPlanner';

export const getStaticProps = async () => {
  const allRecipeData = await getAllRecipeData();

  return {
    props: {
      allRecipeData,
    },
  };
};

interface MealPlannerPageProps {
  allRecipeData: Recipe[]
}

export default function MealPlannerPage({ allRecipeData }: MealPlannerPageProps) {
  return (
    <MealPlanner allRecipeData={allRecipeData} />
  );
}

MealPlannerPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  );
};
