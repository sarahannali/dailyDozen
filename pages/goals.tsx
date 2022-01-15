import React, { ReactElement } from 'react';
import AppLayout from '../components/layout';
import NutritionGoals from '../components/nutritionGoals/NutritionGoals';
import { getNutritionGoalData } from '../lib/goals';
import { NutritionGoalsWithMacros } from '../utils/propTypes';

export const getStaticProps = async () => {
  const nutritionGoalData = await getNutritionGoalData();

  return {
    props: {
      nutritionGoalData,
    },
  };
};

type GoalsPageProps = {
  nutritionGoalData: NutritionGoalsWithMacros
}

export default function GoalsPage({ nutritionGoalData }: GoalsPageProps) {
  return <NutritionGoals allNutritionData={nutritionGoalData} />;
}

GoalsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  );
};
