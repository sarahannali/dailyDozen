export const macros = ['calories', 'carbs', 'fat', 'protein'];

export const EmptyMacros = {
  calories: 0,
  carbs: 0,
  fat: 0,
  protein: 0,
};

export const EmptyNutritionGoals = {
  beans: 0,
  berries: 0,
  cruciferous: 0,
  flaxseed: 0,
  fruit: 0,
  grains: 0,
  greens: 0,
  nuts: 0,
  vegetables: 0,
};

export const EmptyNutritionGoalsWithMacros = { ...EmptyMacros, ...EmptyNutritionGoals };
