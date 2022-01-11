import React from 'react';
import NutritionGoals from '../components/nutritionGoals/NutritionGoals';
import { getNutritionGoalData } from '../lib/goals';
import { NutritionGoals as NutritionGoalsProps } from '../utils/propTypes';

export const getStaticProps = async () => {
  const nutritionGoalData = await getNutritionGoalData();

  return {
    props: {
      nutritionGoalData,
    },
  };
};

type GoalsPageProps = {
  nutritionGoalData: Array<NutritionGoalsProps>
}

export default function GoalsPagePros({ nutritionGoalData }: GoalsPageProps) {
  return <NutritionGoals allNutritionData={nutritionGoalData} />;
}
