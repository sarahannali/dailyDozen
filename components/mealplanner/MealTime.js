import React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import Recipe from './recipeBox/Recipe';
import {Col, Divider} from 'antd';
import classes from '../css/mealplanner.module.css';
import {GetColor} from './utils/index';

const MealTime = ({day, mealTime, meals, deleteMealEvent, updateServings}) => {
  const bgColor = GetColor(mealTime);

  return (
    <Col className={classes.mealCol}>
      <Divider>{mealTime}</Divider>
      <Droppable
        droppableId={day + ':' + mealTime}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
            style={{backgroundColor: bgColor}}>
            {meals ?
              meals.map((meal, index) =>{
                return (<Recipe
                  key={meal.RecipeInfo.name + day + mealTime}
                  listName={day + ':' + mealTime}
                  image={meal.RecipeInfo.imageURL}
                  name={meal.RecipeInfo.name}
                  index={index}
                  isMealEvent
                  mealEventID={meal.id}
                  deleteMealEvent={deleteMealEvent}
                  givenServings={meal.Servings}
                  updateServings={updateServings}
                />);
              }) :
              <div></div>
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );
};

export default MealTime;
