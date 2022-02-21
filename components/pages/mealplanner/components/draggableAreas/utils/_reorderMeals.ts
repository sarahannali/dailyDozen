import { DraggableLocation } from 'react-beautiful-dnd';
import { Calendar, Meals, Meal } from '../../../utils/_populateCalendar';
import { Recipe, MealEvent } from '../../../../../../utils/propTypes';

export const DeleteMeal = (key: string, sourceIdx: number, days: Calendar): [Meal, Calendar] => {
  const codes = key.split(':');

  const [removed] = days
    .find((d) => d.id === codes[0])!
    .meals[codes[1] as keyof Meals]
    .splice(sourceIdx, 1);

  return [removed, days];
};

export const UpdateMeal = (key: string, sourceIdx: number, days: Calendar, newObj: MealEvent) => {
  const codes = key.split(':');
  const daysClone = days;

  daysClone
    .find((d) => d.id === codes[0])!
    .meals[codes[1] as keyof Meals][sourceIdx] = newObj;

  return days;
};

const ReorderMeals = (
  source: DraggableLocation,
  destination: DraggableLocation,
  recipes: Recipe[],
  days: Calendar,
): [Meal, Calendar] => {
  let movedObj;
  const destCodes = destination.droppableId.split(':');

  if (source.droppableId === 'Recipes') {
    const newMealEvent = recipes[source.index];

    movedObj = {
      id: undefined,
      RecipeInfo: {
        recipeID: newMealEvent.id,
        imageURL: newMealEvent.imageURL,
        name: newMealEvent.name,
        ingredients: newMealEvent.ingredients,
        macros: newMealEvent.macros,
        servings: newMealEvent.servings,
      },
      Servings: 1,
    };
  } else {
    [movedObj] = DeleteMeal(source.droppableId, source.index, days);
  }

  days
    .find((d) => d.id === destCodes[0])!
    .meals[destCodes[1] as keyof Meals]
    .splice(destination.index, 0, movedObj);

  return [movedObj, days];
};

export default ReorderMeals;
