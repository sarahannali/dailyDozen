import React, { useState } from 'react';
import {
  Row, Col, Rate, InputNumber, Typography,
} from 'antd';
import Image from 'next/image';
import type { NutritionGoals, Recipe } from 'utils/propTypes/db';
import classes from 'components/css/recipeInfo.module.css';
import MacroValues from './MacroValues';
import Ingredients from './Ingredients';
import NutritionValues from './NutritionValues';

const { Title } = Typography;

type RecipeInfoProps = {
  recipe: Recipe,
  nutritionGoalData: NutritionGoals,
  updateRating: (rating: number) => void
}

function RecipeInfo({
  recipe, nutritionGoalData, updateRating,
}: RecipeInfoProps) {
  const [servings, setServings] = useState(recipe.servings);
  const servingsRatio = recipe.servings;

  return (
    <Row justify="center">
      <div className={classes.recipeInfoDiv}>
        <Row className={classes.recipeImgRow}>
          <Col span={11}>
            <Image
              width={200}
              height={200}
              src={`/images/recipes/${recipe.id}.png`}
              alt={recipe.name}
              className={classes.recipeInfoImg}
            />
          </Col>
          <Col span={13}>
            <Row gutter={[80, 16]} style={{ marginLeft: '-30px', marginRight: '0px' }}>
              <NutritionValues
                ingredients={recipe.ingredients}
                nutritionGoalData={nutritionGoalData}
                servings={servings}
                servingsRatio={servingsRatio}
              />
            </Row>
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
            className={classes.input}
            min={1}
          />
        </Row>
        <Row justify="center">
          <Rate
            defaultValue={recipe.Rating}
            onChange={(e) => updateRating(e)}
          />
        </Row>
        <Ingredients
          ingredients={recipe.ingredients}
          servings={servings}
          servingsRatio={servingsRatio}
        />
        {
          recipe.steps && (
          <Row>
            <Col>
              <Row>
                <Title level={4}>Steps:</Title>
              </Row>
              <Row>
                {recipe.steps.map((step, idx) => (
                  <div key={step}>
                    {idx + 1}
                    {'. '}
                    {step}
                    <p />
                  </div>
                ))}
              </Row>
            </Col>
          </Row>
          )
        }

        <Row justify="center" className={classes.sourceLink}>
          <a href={recipe.source} target="_blank" rel="noreferrer">SOURCE</a>
        </Row>
      </div>
    </Row>
  );
}

export default RecipeInfo;
