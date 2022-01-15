import React, { useState } from 'react';
import {
  Typography, Row, Col, Rate, InputNumber, Button,
} from 'antd';
import Image from 'next/image';
import MacroValues from './MacroValues';
import Ingredients from './Ingredients';
import NutritionValues from './NutritionValues';
import classes from './recipeInfo.module.css';
import { NutritionGoals, Recipe, UserRecipe } from '../../../../utils/propTypes';

const { Title } = Typography;

type RecipeInfoProps = {
  recipe: Recipe,
  nutritionGoalData: NutritionGoals,
  setRecipeInfo: React.Dispatch<React.SetStateAction<UserRecipe>>
}

function RecipeInfo({ recipe, nutritionGoalData, setRecipeInfo }: RecipeInfoProps) {
  const [servings, setServings] = useState(recipe.servings);
  const servingsRatio = recipe.servings;

  return (
    <Row justify="center">
      <div style={{ height: '80vh', width: '60vw' }}>
        <Row style={{ marginBottom: '15px' }}>
          <Col>
            <Image
              loader={() => recipe.imageURL}
              width={200}
              height={200}
              src={recipe.imageURL}
              className={classes.recipeInfoImg}
            />
          </Col>
          <Col span={10}>
            <NutritionValues
              ingredients={recipe.ingredients}
              nutritionGoalData={nutritionGoalData}
              servings={servings}
              servingsRatio={servingsRatio}
            />
          </Col>
        </Row>
        <Row justify="center">
          <MacroValues
            values={recipe.macros}
            servings={servings}
            servingsRatio={servingsRatio}
          />
        </Row>
        <Row justify="center">
          <strong>Servings</strong>
          :
          <InputNumber
            defaultValue={servings}
            onChange={(e) => setServings(e)}
            style={{ width: '75px', marginLeft: '10px' }}
            min={1}
          />
        </Row>
        <Row justify="center">
          <Rate
            defaultValue={recipe.Rating}
            onChange={(e) => setRecipeInfo(() => ({ Favorite: recipe.Favorite, Rating: e }))}
          />
        </Row>
        <Ingredients
          ingredients={recipe.ingredients}
          servings={servings}
          servingsRatio={servingsRatio}
        />
        <Row justify="center">
          <Button
            type="primary"
            href={recipe.source}
          >
            View Recipe
          </Button>
        </Row>
      </div>
    </Row>
  );
}

export default RecipeInfo;
