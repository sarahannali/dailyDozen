import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import Recipe from './Recipe';
import { SearchRecipeSection } from '../../../../common';
import classes from './recipeBox.module.css';
import { Recipe as RecipeType } from '../../../../../utils/propTypes';

type RecipeBoxProps = {
  items: RecipeType[]
  droppableId: string,
  isDragging: boolean
}

function RecipeBox({ items, droppableId, isDragging }: RecipeBoxProps) {
  const [recipes, setRecipes] = useState(items);
  const [visible, setVisible] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <div>
      <div style={visible ? { visibility: 'hidden' } : {}}>
        <Button
          className={classes.addButton}
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
        height="300px"
        className={`${classes.drawer} ${
          isDragging ? classes.transition : {}}`}
      >
        <SearchRecipeSection
          baseRecipes={items}
          setCurrRecipes={setRecipes}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
        />
        <div style={{ marginTop: '20px' }}>
          <Droppable
            droppableId={droppableId}
            direction="horizontal"
            isDropDisabled
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                data-isDraggingOver={snapshot.isDraggingOver}
                style={{
                  display: 'flex',
                  padding: '8',
                }}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...provided.droppableProps}
              >
                {recipes.map((recipe, index) => {
                  const recipeInfo = {
                    imageURL: recipe.imageURL,
                    name: recipe.name,
                  };

                  return (!showFavorites || recipe.Favorite)
                    && (
                    <Recipe
                      listName={droppableId}
                      recipeInfo={recipeInfo}
                      index={index}
                      favorite={recipe.Favorite}
                    />
                    );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </Drawer>
    </div>
  );
}

export default RecipeBox;
