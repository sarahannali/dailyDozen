import React, {useState} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {Card} from 'antd';
import {Typography} from 'antd';
import classes from '../../css/RecipeBox.module.css';

const {Paragraph} = Typography;

const grid = 8;

const getItemStyle = (draggableStyle) => ({
  userSelect: 'none',
  margin: `0 ${grid}px 0 0`,
  backgroundColor: 'white',
  overflow: 'none',
  ...draggableStyle,
});

const Recipe = ({image, name, index, listName}) => {
  const [hover, setHover] = useState(false);
  return (
    <Draggable key={name} draggableId={name + listName + index} index={index}>
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
            className={classes.card}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {hover ?
            <Paragraph ellipsis={{rows: 3}}>
              {name}
            </Paragraph > :
            <img src={image} className={classes.recipeImg} />
            }
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Recipe;
