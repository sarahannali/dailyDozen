import React from 'react';
import {Col, Divider} from 'antd';
import {Droppable} from 'react-beautiful-dnd';
import {GetColor} from './utils';
import {Recipe} from '../../common';
import classes from './calendar.module.css';

const MealTime = ({day, mealTime, meals, deleteMealEvent, updateMealEvent}) => {
  const bgColor = GetColor(mealTime);

  return (
    <Col className={classes.mealCol}>
      <Divider>{mealTime}</Divider>
      <Droppable droppableId={day + ':' + mealTime}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
            style={{backgroundColor: bgColor}}>
            {meals ?
              meals.map((meal, index) =>{
                return (<Recipe
                  isMealEvent
                  recipeInfo={meal.RecipeInfo}
                  listName={day + ':' + mealTime}
                  index={index}
                  meal={meal}
                  givenServings={meal.Servings}
                  deleteMealEvent={deleteMealEvent}
                  updateMealEvent={updateMealEvent}
                />);
              }) : <div></div>}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );
};

export default MealTime;
