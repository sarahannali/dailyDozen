import React, {useState} from 'react';
import {Drawer, Button} from 'antd';
import {Droppable} from 'react-beautiful-dnd';
import {Recipe} from '../../common';
import { SearchBar } from '../../../../common';
import classes from './recipeBox.module.css';

import {
  PlusOutlined
} from '@ant-design/icons';

const RecipeBox = ({items, droppableId, isDragging}) => {
  const [recipes, setRecipes] = useState(items);
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div style={visible ? {visibility: 'hidden'} : {}}>
        <Button className={classes.addButton}
          type="primary"
          onClick={() => setVisible(true)}
        >
          <PlusOutlined />
        </Button>
      </div>
      <Drawer
        placement="bottom"
        closable
        title="Recipes"
        onClose={() => setVisible(false)}
        visible={visible}
        height='300px'
        className={classes.drawer + ' ' +
        (isDragging ? classes.transition : {})}
      >
        <SearchBar 
            allData={items}
            setData={setRecipes}
            searchKeys={['name']}
        />
        <div style={{marginTop: '20px'}}>
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
                  padding: '8',
                }}
                {...provided.droppableProps}>
                {recipes.map((recipe, index) =>{
                  const recipeInfo = {
                    imageURL: recipe.imageURL,
                    name: recipe.name
                  }
                  
                  return (<Recipe
                    listName={droppableId}
                    recipeInfo={recipeInfo}
                    index={index}
                  />);
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </Drawer>
    </div>
  );
};

export default RecipeBox;
