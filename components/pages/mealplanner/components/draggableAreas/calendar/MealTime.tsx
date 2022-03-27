import React from 'react';
import { Col, Divider } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import type { MealEvent } from 'utils/propTypes/db';
import classes from 'components/css/mealPlanner.module.css';
import type { Meal, Meals } from 'components/pages/mealplanner/types';
import GetColor from './utils';
import Recipe from './recipe/Recipe';

type MealTimeProps = {
  day: string,
  mealTime: keyof Meals,
  meals: Meal[],
  deleteMealEvent: (mealEventID: string, codes: string, sourceIdx: number) => Promise<void>,
  updateMealEvent: (movedObj: MealEvent, codes: string, sourceIdx: number) => Promise<void>
}

function MealTime({
  day, mealTime, meals, deleteMealEvent, updateMealEvent,
}: MealTimeProps) {
  const bgColor = GetColor(mealTime);

  return (
    <Col className={classes.mealCol}>
      <Divider>{mealTime}</Divider>
      <Droppable droppableId={`${day}:${mealTime}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            data-isdraggingover={snapshot.isDraggingOver}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.droppableProps}
            style={{
              backgroundColor:
                (meals.length > 0 || snapshot.isDraggingOver)
                  ? bgColor
                  : 'transparent',
              minHeight: '1px',
            }}
          >
            {meals && meals.map((meal, index) => (
              <Recipe
                key={meal.RecipeInfo.name + day + mealTime}
                isMealEvent
                recipeInfo={meal.RecipeInfo}
                listName={`${day}:${mealTime}`}
                index={index}
                meal={meal}
                givenServings={meal.Servings}
                deleteMealEvent={deleteMealEvent}
                updateMealEvent={updateMealEvent}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );
}

export default MealTime;
