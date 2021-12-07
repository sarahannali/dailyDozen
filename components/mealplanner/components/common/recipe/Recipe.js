import React, {useState} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {Card, Typography} from 'antd';
import classes from './recipe.module.css';
import RecipeMealEvent from './RecipeMealEvent';

const {Paragraph} = Typography;

const getItemStyle = (draggableStyle) => ({
  userSelect: 'none',
  margin: `0 8px 0 0`,
  backgroundColor: 'white',
  overflow: 'none',
  transition: '2s',
  ...draggableStyle,
});

const Recipe = ({isMealEvent = false, recipeInfo, index, listName, meal, deleteMealEvent = () => {}, updateMealEvent = () => {}, givenServings = 1}) => {
  const [hover, setHover] = useState(false);
  const [servings, setServings] = useState(givenServings);

  const onMouseLeave = () => {
    setHover(false);

    if (isMealEvent && servings != meal.Servings) {
      meal.Servings = servings;
      updateMealEvent(meal, listName, index);
    }
  }

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
          <Card
            onMouseEnter={() => setHover(true)}
            onMouseLeave={onMouseLeave}
            className={classes.card}
          >
            {hover ?
              isMealEvent ?
                <RecipeMealEvent
                  name={recipeInfo.name}
                  index={index}
                  meal={meal}
                  listName={listName}
                  servings={servings}
                  deleteMealEvent={deleteMealEvent} 
                  setServings={setServings}
                />
                : <Paragraph style={{marginBottom: "0px", height: "90px", width: "90px"}} ellipsis={{rows: 3}}>
                    {recipeInfo.name}
                  </Paragraph>
              : <img src={recipeInfo.imageURL} className={classes.recipeImg} />
            }
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Recipe;
