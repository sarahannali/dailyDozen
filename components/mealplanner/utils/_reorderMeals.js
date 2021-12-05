export const DeleteMeal = (codes, sourceIdx, days) => {
  const [removed] = days
    .find((d) => d.id === codes[0])
    .meals[codes[1]]
    .splice(sourceIdx, 1);

  return [removed, days];
}

export const UpdateMeal = (codes, sourceIdx, days, servings) => {
  days
    .find((d) => d.id === codes[0])
    .meals[codes[1]]
    [sourceIdx]
    .Servings = servings

  return days;
}

const ReorderMeals = (source, destination, recipes, days) => {
  let removed;
  const daysClone = Array.from(days);
  const destCodes = destination.droppableId.split(':');

  if (source.droppableId == 'Recipes') {
    const newMealEvent = recipes[source.index];
    removed = {
      id: null,
      RecipeInfo: {
        recipeID: newMealEvent.id,
        imageURL: newMealEvent.imageURL, 
        name: newMealEvent.name,
        ingredients: newMealEvent.ingredients,
        nutritionValues: newMealEvent.nutritionValues
      }
    };
  } else {
    const sourceCodes = source.droppableId.split(':');

    [removed] = DeleteMeal(sourceCodes, source.index, daysClone);
  }

  daysClone
    .find((d) => d.id === destCodes[0])
    .meals[destCodes[1]]
    .splice(destination.index, 0, removed);

  return [
    daysClone,
    {
      id: removed.id,
      Date: destCodes[0],
      MealTime: destCodes[1],
      RecipeInfo: removed.RecipeInfo
    }
  ];
};

export default ReorderMeals;