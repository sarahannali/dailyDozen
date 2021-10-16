import React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import Recipe from './recipeBox/Recipe';
import {Col, Divider} from 'antd';
import classes from '../css/mealplanner.module.css';
import {getColor} from './_mealPlanner';

const MealTime = ({day, mealTime, meals}) => {
  const bgColor = getColor(mealTime);

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
            style={{backgroundColor: bgColor}}>
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
