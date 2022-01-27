import { macros } from '../../../utils/constants/goals';
import { NutritionGoalsWithMacros } from '../../../utils/propTypes';

const isNotMacro = (goal: keyof NutritionGoalsWithMacros) => macros.findIndex(
  (macro) => macro === goal,
) === -1;

export default isNotMacro;
