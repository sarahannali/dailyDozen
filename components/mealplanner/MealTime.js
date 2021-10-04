import React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import Recipe from './RecipeBox/Recipe';
import {Col, Divider} from 'antd';
import classes from '../css/mealplanner.module.css';

const getColor = (mealTime) => {
  switch (mealTime) {
    case 'breakfast':
      return '#A8DBE9';
    case 'lunch':
      return '#FF9999';
    case 'dinner':
      return '#FDD09B';
  }
};

const MealTime = ({day, mealTime, meals}) => {
  return (
    <Col className={classes.mealCol}>
      <Divider>{mealTime}</Divider>
      <Droppable
        droppableId={day + ':' + mealTime}
        style={{width: '145px'}}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
            style={{backgroundColor: getColor(mealTime)}}>
            {meals ?
              meals.map((meal, index) =>{
                return (<Recipe
                  key={meal.name + day + mealTime}
                  listName={day + mealTime}
                  image={meal.imageURL}
                  name={meal.name}
                  index={index}
                />);
              }) :
              <div>PLACE HERE {mealTime}</div>
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );
};

export default MealTime;
