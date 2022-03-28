import React, { useState, useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import type { Recipe } from 'utils/propTypes/db';
import { getAllUserRecipeData, getNutritionGoalData } from 'components/requests';
import { addUserRecipeData } from 'components/common/utils';
import { SearchRecipeSection } from 'components/common';
import { EmptyNutritionGoalsWithMacros } from 'utils/constants/goals';
import classes from 'components/css/recipes.module.css';
import RecipeCard from './components';

const { Title } = Typography;

type RecipesProps = {
  recipes: Recipe[]
}

function Recipes({ recipes }: RecipesProps) {
  const [baseRecipes, setBaseRecipes] = useState(recipes);
  const [currRecipes, setCurrRecipes] = useState(recipes);
  const [nutritionGoalData, setNutritionGoalData] = useState(EmptyNutritionGoalsWithMacros);
  const [showFavorites, setShowFavorites] = useState(false);

  const updateRecipes = async () => {
    const refreshedUserData = await getAllUserRecipeData();

    setBaseRecipes(addUserRecipeData(baseRecipes, refreshedUserData));
    setCurrRecipes(addUserRecipeData(currRecipes, refreshedUserData));
  };

  useEffect(() => {
    getNutritionGoalData()
      .then((res) => {
        if (res) setNutritionGoalData(res);
      });

    getAllUserRecipeData()
      .then((res) => {
        setBaseRecipes(addUserRecipeData(recipes, res));
        setCurrRecipes(addUserRecipeData(recipes, res));
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.recipeDiv}>
      <Row justify="center" className={classes.recipeTitle}>
        <Title level={2}>Recipes</Title>
      </Row>
      <Row>
        <Col span={3} />
        <SearchRecipeSection
          baseRecipes={baseRecipes}
          showFavorites={showFavorites}
          setShowFavorites={setShowFavorites}
          setCurrRecipes={setCurrRecipes}
        />
      </Row>
      <Row justify="center" className={classes.recipesRow}>
        <Col span={2} />
        <Col span={20}>
          <Row>
            {
              currRecipes.map((recipe) => (
                (!showFavorites) || (showFavorites && recipe.Favorite))
                    && (
                    <Col
                      xs={24}
                      xl={7}
                      key={recipe.id}
                      className={classes.recipesCol}
                    >
                      <RecipeCard
                        recipe={recipe}
                        nutritionGoalData={nutritionGoalData}
                        updateRecipes={updateRecipes}
                      />
                    </Col>
                    ))
            }
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Recipes;
