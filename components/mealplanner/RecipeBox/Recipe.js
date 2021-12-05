import React, {useState} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {Button, Card, Popconfirm, Typography, Tooltip, notification} from 'antd';
import classes from '../../css/RecipeBox.module.css';
import {
  CloseOutlined,
  CaretLeftOutlined,
  CaretRightOutlined
} from '@ant-design/icons';
import axios from 'axios';

const {Paragraph} = Typography;

const getItemStyle = (draggableStyle) => ({
  userSelect: 'none',
  margin: `0 8px 0 0`,
  backgroundColor: 'white',
  overflow: 'none',
  transition: '2s',
  ...draggableStyle,
});

const Recipe = ({image, name, index, listName, isMealEvent = false, mealEventID = null, deleteMealEvent = () => {}, givenServings = 1, updateServings = () => {}}) => {
  const [hover, setHover] = useState(false);
  const [servings, setServings] = useState(givenServings);

  const onMouseLeave = () => {
    setHover(false);

    if (isMealEvent && servings != givenServings) {
      updateServings(mealEventID, listName, servings, index);
    }
  }

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
            onMouseEnter={() => setHover(true)}
            onMouseLeave={onMouseLeave}
            className={classes.card}
          >
            {hover ?
            <>
                {isMealEvent ? 
                  <Popconfirm
                    title="Are you sure to delete this meal event?"
                    onConfirm={() => deleteMealEvent(mealEventID, listName, index)}
                    okText="Yes"
                    cancelText="No"
                    placement="leftTop"
                  >
                    <Button className={classes.deleteButton} type="primary" danger>
                      <CloseOutlined />
                    </Button>
                  </Popconfirm>
                  : <></>}
              <Paragraph style={{marginBottom: "0px", height: "90px", width: "90px"}} ellipsis={{rows: 3}}>
                {name}
              </Paragraph >
              { isMealEvent ?
              <>
                <span
                  className={classes.leftServingArrow}
                  onClick={() => servings > 0 && setServings(servings - 1)}
                  style={{color: servings <= 0 && "gray"}}
                >
                  <CaretLeftOutlined />
                </span>
                <Tooltip title="Servings">
                  <div className={classes.servingSize}>{servings}</div>
                </Tooltip>
                <span className={classes.rightServingArrow} onClick={() => setServings(servings + 1)}>
                  <CaretRightOutlined />
                </span>
              </>
              : <></>
              }
            </>
            :
            <>
              <img src={image} className={classes.recipeImg} />  
              {isMealEvent ? 
                <Tooltip title="Servings">
                  <div className={classes.servingSize}>{servings}</div>
                </Tooltip>
              :<></>}              
            </>
            }
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Recipe;
