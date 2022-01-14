import React from 'react';
import NutritionGoals from '../components/nutritionGoals/NutritionGoals';
import { getNutritionGoalData } from '../lib/goals';
import { NutritionGoals as NutritionGoalsType } from '../utils/propTypes';

export const getStaticProps = async () => {
  const nutritionGoalData = await getNutritionGoalData();

  return {
    props: {
      nutritionGoalData,
    },
  };
};

type GoalsPageProps = {
  nutritionGoalData: NutritionGoalsType
}

export default function GoalsPagePros({ nutritionGoalData }: GoalsPageProps) {
  return <NutritionGoals allNutritionData={nutritionGoalData} />;
}
