import React from 'react';
import type { ReactElement } from 'react';
import {
  getAllRecipeData,
} from '../lib';
import {
  Recipe,
} from '../utils/propTypes';
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

export default function MealPlannerPage({
  allRecipeData,
}: MealPlannerPageProps) {
  return (
    <MealPlanner
      allRecipeData={allRecipeData}
    />
  );
}

MealPlannerPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  );
};
