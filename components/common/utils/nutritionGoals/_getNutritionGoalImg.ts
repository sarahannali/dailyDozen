import { NutritionGoals } from 'utils/propTypes/db';
import beansImg from '../../../../public/images/goals/beans.png';
import berriesImg from '../../../../public/images/goals/berries.png';
import cruciferousImg from '../../../../public/images/goals/cruciferous.png';
import flaxseedImg from '../../../../public/images/goals/flaxseed.png';
import fruitImg from '../../../../public/images/goals/fruit.png';
import grainsImg from '../../../../public/images/goals/grains.png';
import greensImg from '../../../../public/images/goals/greens.png';
import nutsImg from '../../../../public/images/goals/nuts.png';
import vegetablesImg from '../../../../public/images/goals/vegetables.png';

const GoalImgMap = {
  beans: beansImg,
  berries: berriesImg,
  cruciferous: cruciferousImg,
  flaxseed: flaxseedImg,
  fruit: fruitImg,
  grains: grainsImg,
  greens: greensImg,
  nuts: nutsImg,
  vegetables: vegetablesImg,
};

const GetNutritionGoalImg = (goal: keyof NutritionGoals) => GoalImgMap[goal];

export default GetNutritionGoalImg;
