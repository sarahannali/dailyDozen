import { Macros } from './Recipe';

interface NutritionGoals {
  beans: number,
  berries: number,
  cruciferous: number,
  flaxseed: number,
  fruit: number,
  grains: number,
  greens: number,
  nuts: number,
  vegetables: number
}

export interface NutritionGoalsWithMacros extends NutritionGoals, Macros {}

export default NutritionGoals;
