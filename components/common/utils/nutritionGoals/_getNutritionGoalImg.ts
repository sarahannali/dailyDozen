import beansImg from '../../../../public/images/beans.png';
import berriesImg from '../../../../public/images/berries.png';
import cruciferousImg from '../../../../public/images/cruciferous.png';
import flaxseedImg from '../../../../public/images/flaxseed.png';
import fruitImg from '../../../../public/images/fruit.png';
import grainsImg from '../../../../public/images/grains.png';
import greensImg from '../../../../public/images/greens.png';
import nutsImg from '../../../../public/images/nuts.png';
import vegetablesImg from '../../../../public/images/vegetables.png';
import { NutritionGoals } from '../../../../utils/propTypes';

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
