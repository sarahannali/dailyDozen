import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import {
  ReorderMeals,
  DeleteMeal,
  UpdateMeal,
  getRequestObj,
} from './utils';
import {
  postMealEvent,
  putMealEvent,
  deleteMealEvent,
} from '../../requests';
import { Calendar } from './calendar';
import { RecipeBox } from './recipeBox';
import { Recipe, NutritionGoalsWithMacros, MealEvent } from '../../../../utils/propTypes';
import { Calendar as CalendarType } from '../../utils/_populateCalendar';

type DraggableAreasProps = {
  allRecipeData: Recipe[],
  nutritionGoalData: NutritionGoalsWithMacros,
  days: CalendarType,
  setDays: React.Dispatch<React.SetStateAction<CalendarType>>,
  performRequest: (request: (x: any) => Promise<boolean>, body: unknown) => Promise<any>

}

function DraggableAreas({
  allRecipeData, nutritionGoalData, days, setDays, performRequest,
}: DraggableAreasProps) {
  const [draggingRecipe, setDraggingRecipe] = useState(false);

  const onDragStart = (result: DropResult) => {
    if (result.source.droppableId === 'Recipes') setDraggingRecipe(true);
  };

  const onDragEnd = async (result: DropResult) => {
    setDraggingRecipe(false);

    // dropped outside the list or back in recipes
    if (!result.destination || result.destination.droppableId === 'Recipes') {
      return;
    }

    const [movedObj, newDays] = ReorderMeals(
      result.source,
      result.destination,
      allRecipeData,
      days,
    );

    const reqObj = getRequestObj(movedObj, result.destination.droppableId);

    if (result.source.droppableId === 'Recipes') {
      movedObj.id = await performRequest(postMealEvent, reqObj);
      movedObj.Servings = 1;
    } else {
      await performRequest(putMealEvent, reqObj);
    }

    setDays([...newDays]);
  };

  const deleteMealEventHandler = async (mealEventID: string, codes: string, sourceIdx: number) => {
    await performRequest(deleteMealEvent, mealEventID);
    const [_, newDays] = DeleteMeal(codes, sourceIdx, days);

    setDays([...newDays]);
  };

  const updateMealEvent = async (movedObj: MealEvent, codes: string, sourceIdx: number) => {
    const reqObj = getRequestObj(movedObj, codes);
    await performRequest(putMealEvent, reqObj);

    const newDays = UpdateMeal(codes, sourceIdx, days, movedObj);
    setDays([...newDays]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Calendar
        days={days}
        nutritionGoalData={nutritionGoalData}
        deleteMealEvent={deleteMealEventHandler}
        updateMealEvent={updateMealEvent}
      />
      <RecipeBox
        items={allRecipeData}
        droppableId="Recipes"
        isDragging={draggingRecipe}
      />
    </DragDropContext>
  );
}

export default DraggableAreas;
