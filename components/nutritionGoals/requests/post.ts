import axios from 'axios';
import { NutritionGoalsWithMacros } from '../../../utils/propTypes';

// eslint-disable-next-line import/prefer-default-export
export const postNutritionGoals = (nutritionGoals: NutritionGoalsWithMacros) => axios.post('/api/routes/goals', nutritionGoals);
