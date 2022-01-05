import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {Badge} from 'antd';
import RecipeCard from './RecipeCard';

import {
  HeartFilled
} from '@ant-design/icons';

const getItemStyle = (draggableStyle) => ({
  userSelect: 'none',
  margin: `0 8px 0 0`,
  backgroundColor: 'white',
  overflow: 'none',
  transition: '2s',
  ...draggableStyle,
});

const Recipe = ({isMealEvent = false, recipeInfo, index, listName, meal, deleteMealEvent = () => {}, updateMealEvent = () => {}, givenServings = 1, favorite = false}) => {

  return (
    <Draggable key={recipeInfo.name} draggableId={recipeInfo.name + listName + index} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
              provided.draggableProps.style
          )}
        > 
        {
          favorite
          ? <Badge count={<HeartFilled style={{color: '#eb2f96', fontSize:'20px'}} />}>
              <RecipeCard 
                isMealEvent={isMealEvent}
                recipeInfo={recipeInfo}
                index={index}
                listName={listName}
                meal={meal}
                deleteMealEvent={deleteMealEvent}
                updateMealEvent={updateMealEvent}
                givenServings={givenServings}
              />
            </Badge>
          : <RecipeCard 
              isMealEvent={isMealEvent}
              recipeInfo={recipeInfo}
              index={index}
              listName={listName}
              meal={meal}
              deleteMealEvent={deleteMealEvent}
              updateMealEvent={updateMealEvent}
              givenServings={givenServings}
            />
        }
        </div>
      )}
    </Draggable>
  );
};

export default Recipe;
