import NutritionGoals from '../components/nutritionGoals/NutritionGoals';
import { getNutritionGoalData } from '../lib/goals';

export const getStaticProps = async () => {
  const allNutritionData = await getNutritionGoalData();

  return {
    props: {
      allNutritionData
    }
  }
};

export default function GoalsPage({allNutritionData}) {
  return <NutritionGoals allNutritionData={allNutritionData}/>
}