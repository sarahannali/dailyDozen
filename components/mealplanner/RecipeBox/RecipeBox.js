import React, {useState} from 'react';
import {Input, Drawer, Button} from 'antd';
import {Droppable} from 'react-beautiful-dnd';
import {
  FilterOutlined,
} from '@ant-design/icons';
import Recipe from './Recipe';
import classes from '../../css/RecipeBox.module.css';

const {Search} = Input;

import {PlusOutlined, DeleteOutlined} from '@ant-design/icons';

const RecipeBox = ({items, droppableId, isDragging}) => {
  console.log("ITEMS: " + items);
  const [visible, setVisible] = useState(false);
  const grid = 8;

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <div style={visible ? {visibility: 'hidden'} : {}}>
        <Button className={classes.addButton}
          type="primary"
          onClick={showDrawer}
        >
          <PlusOutlined />
        </Button>
        <Button className={classes.trashButton}>
          <DeleteOutlined />
        </Button>
      </div>
      <Drawer
        placement="bottom"
        closable
        onClose={onClose}
        visible={visible}
        className={classes.drawer + ' ' +
        (isDragging ? classes.transition : {})}
      >
        <Search
          placeholder="input search text"
          style={{width: 200}}
        />
        <FilterOutlined />
        <Droppable
          droppableId={droppableId}
          direction="horizontal"
          isDropDisabled
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
              style={{
                display: 'flex',
                padding: grid,
              }}
              {...provided.droppableProps}>
              {items.map((recipe, index) =>{
                return (<Recipe
                  key={recipe.name}
                  listName={droppableId}
                  image={recipe.imageURL}
                  name={recipe.name}
                  index={index}
                />);
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Drawer>
    </div>
  );
};

export default RecipeBox;
