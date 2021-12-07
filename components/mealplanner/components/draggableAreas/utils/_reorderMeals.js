export const DeleteMeal = (key, sourceIdx, days) => {
  const codes = key.split(':');

  const [removed] = days
    .find((d) => d.id === codes[0])
    .meals[codes[1]]
    .splice(sourceIdx, 1);

  return [removed, days];
}

export const UpdateMeal = (key, sourceIdx, days, newObj) => {
  const codes = key.split(':');

  days
    .find((d) => d.id === codes[0])
    .meals[codes[1]]
    [sourceIdx] = newObj;

  return days;
}

const ReorderMeals = (source, destination, recipes, days) => {
  let movedObj;
  const destCodes = destination.droppableId.split(':');

  if (source.droppableId == 'Recipes') {
    const newMealEvent = recipes[source.index];

    movedObj = {
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
    [movedObj] = DeleteMeal(source.droppableId, source.index, days);
  }

  days
    .find((d) => d.id === destCodes[0])
    .meals[destCodes[1]]
    .splice(destination.index, 0, movedObj);

  return [movedObj, days];
};

export default ReorderMeals;