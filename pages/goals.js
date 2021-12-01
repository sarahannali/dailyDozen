import NutritionGoals from '../components/nutritionGoals/NutritionGoals';
import { getNutritionGoalInfo, postNutritionGoalData, testingGet } from '../lib/goals';

export const getStaticProps = async () => {
  const allNutritionData = await getNutritionGoalInfo();

  return {
    props: {
      allNutritionData
    }
  }
};

export default function GoalsPage({allNutritionData}) {
  return <NutritionGoals allNutritionData={allNutritionData}/>
}