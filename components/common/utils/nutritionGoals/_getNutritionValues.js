const GetNutritionValues = (ingredients, nutritionGoalData, servings, servingsRatio) => {
  const nutritionMap = new Object();
  
  Object.keys(nutritionGoalData).map(goal => {
    return nutritionMap[goal] = 0;
  });

  ingredients.map(ingr => {
    const { types } = ingr;
    
    if (types) {
      types.map(type => {
        const servingsMultiplier = servings / servingsRatio;
        let goal = nutritionGoalData[type];

        if (goal < 1) {
          goal *= nutritionGoalData.calories;
        }

        const amountInIngr = servingsMultiplier * ingr.grams;
        const amountOfGoal = amountInIngr / goal;

        nutritionMap[type] += amountOfGoal;
      })
    }
  });

  return nutritionMap;
}

export default GetNutritionValues;