const ReorderMeals = (source, destination, recipes, days) => {
  let removed;
  const daysClone = Array.from(days);

  if (source.droppableId == 'Recipes') {
    removed = recipes[source.index];
  } else {
    const sourceCodes = source.droppableId.split(':');

    [removed] = daysClone
        .find((d) => d.id === sourceCodes[0])
        .meals
        .find((m) => m.id == sourceCodes[1])
        .recipes
        .splice(source.index, 1);
  }

  const destCodes = destination.droppableId.split(':');

  daysClone
      .find((d) => d.id === destCodes[0])
      .meals
      .find((m) => m.id == destCodes[1])
      .recipes
      .splice(destination.index, 0, removed);

  return daysClone;
};

export default ReorderMeals;