import React, { useState, useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import { RecipeCard, CreateRecipe } from './components';
import { SearchRecipeSection } from '../../common';
import { Recipe } from '../../../utils/propTypes';
import { EmptyNutritionGoalsWithMacros } from '../../../utils/constants/goals';
import { getAllUserRecipeData } from '../../requests/userRecipes/get';
import addUserRecipeData from './utils/addUserRecipeData';
import { getNutritionGoalData } from '../../requests';

const { Title } = Typography;

type RecipesProps = {
  recipes: Recipe[]
}

function Recipes({ recipes }: RecipesProps) {
  const [baseRecipes, setBaseRecipes] = useState(recipes);
  const [currRecipes, setCurrRecipes] = useState(recipes);
  const [nutritionGoalData, setNutritionGoalData] = useState(EmptyNutritionGoalsWithMacros);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    setCurrRecipes(baseRecipes);
  }, [baseRecipes]);

  const updateRecipes = async () => {
    console.log('UPDATE REIPCES');
    // const upToDateRecipes = await getRecipes();
    // setBaseRecipes(upToDateRecipes);
  };

  useEffect(() => {
    getNutritionGoalData()
      .then((res) => {
        setNutritionGoalData(res);
      });

    getAllUserRecipeData()
      .then((res) => {
        setBaseRecipes(addUserRecipeData(recipes, res));
      });
  }, []);

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