import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import type { Recipe as RecipeType } from 'utils/propTypes/db';
import classes from 'components/css/mealPlanner.module.css';
import { SearchRecipeSection } from 'components/common';
import Recipe from './Recipe';

type RecipeBoxProps = {
  recipes: RecipeType[],
  droppableId: string,
  isDragging: boolean
}

function RecipeBox({
  recipes, droppableId, isDragging,
}: RecipeBoxProps) {
  const [currRecipes, setCurrRecipes] = useState(recipes);
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
        className={`${classes.drawer} ${isDragging ? classes.transition : {}}`}
      >
        <SearchRecipeSection
          baseRecipes={recipes}
          setCurrRecipes={setCurrRecipes}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
        />
        <div className={classes.recipeDroppableDiv}>
          <Droppable
            droppableId={droppableId}
            direction="horizontal"
            isDropDisabled
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                data-isdraggingover={snapshot.isDraggingOver}
                className={classes.recipeDiv}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...provided.droppableProps}
              >
                {currRecipes.map((recipe) => {
                  const recipeInfo = {
                    id: recipe.id,
                    name: recipe.name,
                  };

                  return (!showFavorites || recipe.Favorite)
                    && (
                    <Recipe
                      listName={droppableId}
                      key={recipe.name}
                      recipeInfo={recipeInfo}
                      index={recipes.findIndex((i) => i.id === recipe.id)}
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
