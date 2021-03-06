/* eslint-disable react/jsx-props-no-spreading */
import React, { CSSProperties, useState } from 'react';
import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { Card } from 'antd';
import Image from 'next/image';
import type { MealEvent, MealEventRecipe } from 'utils/propTypes/db';
import classes from 'components/css/mealPlanner.module.css';
import type { Meal } from 'components/pages/mealplanner/types';
import RecipeMealEvent from './RecipeMealEvent';

const getItemStyle = (
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
): CSSProperties => ({
  userSelect: 'none',
  margin: '0 8px 0 0',
  backgroundColor: 'white',
  overflow: 'none',
  ...draggableStyle,
});

type RecipeProps = {
  recipeInfo: MealEventRecipe,
  index: number,
  listName: string,
  isMealEvent: true,
  meal: Meal | MealEvent,
  deleteMealEvent: (mealEventID: string, codes: string, sourceIdx: number) => Promise<void>,
  updateMealEvent: (movedObj: MealEvent, codes: string, sourceIdx: number) => Promise<void>,
  givenServings: number
}

function Recipe({
  isMealEvent,
  recipeInfo,
  index,
  listName,
  meal,
  deleteMealEvent,
  updateMealEvent,
  givenServings,
}: RecipeProps) {
  const [hover, setHover] = useState(false);
  const [servings, setServings] = useState(givenServings);

  const onMouseLeave = () => {
    setHover(false);

    if (isMealEvent && meal && servings !== meal.Servings) {
      const newMeal = meal;
      newMeal.Servings = servings;

      updateMealEvent(newMeal as MealEvent, listName, index);
    }
  };

  const onHoverImg = (
    <RecipeMealEvent
      name={recipeInfo.name}
      index={index}
      meal={meal}
      listName={listName}
      servings={servings}
      deleteMealEvent={deleteMealEvent}
      setServings={setServings}
    />
  );

  return (
    <Draggable key={recipeInfo.name} draggableId={recipeInfo.name + listName + index} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            provided.draggableProps.style,
          )}
        >
          <Card
            onMouseEnter={() => setHover(true)}
            onMouseLeave={onMouseLeave}
            className={classes.card}
          >
            {hover
              ? onHoverImg
              : (
                <Image
                  width={90}
                  height={90}
                  src={`/images/recipes/${recipeInfo.id}.png`}
                  alt={recipeInfo.name}
                  className={classes.recipeImg}
                />
              )}
          </Card>
        </div>
      )}
    </Draggable>
  );
}

export default Recipe;
