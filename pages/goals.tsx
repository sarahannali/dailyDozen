import React, { ReactElement } from 'react';
import AppLayout from '../components/layout';
import NutritionGoals from '../components/nutritionGoals/NutritionGoals';

export default function GoalsPage() {
  return <NutritionGoals />;
}

GoalsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      {page}
    </AppLayout>
  );
};
