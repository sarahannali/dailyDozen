import NutritionGoals from '../components/nutritionGoals/NutritionGoals';
import { getAllNutritionGoalInfo, postNutritionGoalData, testingGet } from '../lib/goals';

export const getStaticProps = async () => {
  const allNutritionData = await getAllNutritionGoalInfo();

  return {
    props: {
      allNutritionData
    }
  }
};

export default function GoalsPage({allNutritionData}) {
  return <NutritionGoals allNutritionData={allNutritionData}/>
}