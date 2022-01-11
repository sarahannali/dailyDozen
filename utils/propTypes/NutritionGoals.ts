import { Macros } from './Recipe';

interface NutritionGoals {
  beans: number,
  berries: number,
  calories: number,
  carbs: number,
  cruciferous: number,
  fat: number,
  flaxseed: number,
  fruit: number,
  grains: number,
  greens: number,
  nuts: number,
  protein: number,
  vegetables: number
}

export interface NutritionGoalsWithMacros extends NutritionGoals, Macros {}

export default NutritionGoals;
