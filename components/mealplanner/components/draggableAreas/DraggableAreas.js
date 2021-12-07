import React, {useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {
  ReorderMeals,
  DeleteMeal,
  UpdateMeal,
  getRequestObj
} from './utils';
import { 
  postMealEvent,
  putMealEvent,
  deleteMealEvent
} from '../../requests';
import {Calendar} from './calendar';
import {RecipeBox} from './recipeBox';


const DraggableAreas = ({allRecipeData, allNutritionData, days, setDays, performRequest}) => {
  const [draggingRecipe, setDraggingRecipe] = useState(false);

  const onDragStart = (result) => {
    if (result.source.droppableId == 'Recipes') setDraggingRecipe(true);
  };

  const onDragEnd = async (result) => {
    setDraggingRecipe(false);

    // dropped outside the list or back in recipes
    if (!result.destination || result.destination.droppableId == 'Recipes') {
      return;
    }

    const [movedObj, newDays] = ReorderMeals(
      result.source,
      result.destination,
      allRecipeData,
      days
    )

    const reqObj = getRequestObj(movedObj, result.destination.droppableId);

    if (result.source.droppableId == 'Recipes') {
      movedObj.id = await performRequest(postMealEvent, reqObj);
      movedObj.Servings = 1;
    } else {
      await performRequest(putMealEvent, reqObj)
    }

    setDays([...newDays]);
  };

  const deleteMealEventHandler = async (mealEventID, codes, sourceIdx) => {
    await performRequest(deleteMealEvent, mealEventID);
    const [_, newDays] = DeleteMeal(codes, sourceIdx, days);

    setDays([...newDays]);
  }

  
  const updateMealEvent = async (movedObj, codes, sourceIdx) => {
    const reqObj = getRequestObj(movedObj, codes);
    await performRequest(putMealEvent, reqObj);

    const newDays = UpdateMeal(codes, sourceIdx, days, movedObj);
    setDays([...newDays]);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Calendar
        days={days}
        allNutritionData={allNutritionData}
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
};

export default DraggableAreas;
