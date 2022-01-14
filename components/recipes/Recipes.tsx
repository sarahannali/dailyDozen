import React, { useState, useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import { RecipeCard, CreateRecipe } from './components';
import { getRecipes } from './requests';
import { SearchRecipeSection } from '../common';
import { NutritionGoals, Recipe } from '../../utils/propTypes';

const { Title } = Typography;

type RecipesProps = {
  recipes: Recipe[],
  nutritionGoalData: NutritionGoals
}

function Recipes({ recipes, nutritionGoalData }: RecipesProps) {
  const [baseRecipes, setBaseRecipes] = useState(recipes);
  const [currRecipes, setCurrRecipes] = useState(recipes);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    setCurrRecipes(baseRecipes);
  }, [baseRecipes]);

  const updateRecipes = async () => {
    const upToDateRecipes = await getRecipes();
    setBaseRecipes(upToDateRecipes);
  };

  return (
    <div>
      <Row justify="center" style={{ marginBottom: '10px' }}>
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
      <Row justify="center" style={{ marginTop: '40px' }}>
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
                      style={{ marginBottom: '20px' }}
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
      <CreateRecipe />
    </div>
  );
}

export default Recipes;
