import { NutritionGoalsWithMacros } from 'utils/propTypes/db';
import { macros } from '../../../../utils/constants/goals';

const isNotMacro = (goal: keyof NutritionGoalsWithMacros) => macros.findIndex(
  (macro) => macro === goal,
) === -1;

export default isNotMacro;
