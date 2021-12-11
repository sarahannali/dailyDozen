import React, { useState } from 'react';
import {Typography, Row, Col} from 'antd';
import NutritionValues from './NutritionValues';
import classes from '../recipes.module.css';
import Ingredients from './Ingredients';

const {Title} = Typography;

const RecipeInfo = ({ recipe }) => {
  const [servings, setServings] = useState(recipe.nutritionValues.servings)
  const servingsRatio = recipe.nutritionValues.servings;

  return (
    <Row justify="center">
      <div style={{height: "80vh", width: "60vw"}}>
        <Row style={{marginBottom: '15px'}}>
          <Col>
            <img src={recipe.imageURL} className={classes.recipeInfoImg} />
          </Col>
          <Col span={2} />
        </Row>
        <Row justify="center">
          <NutritionValues
            values={recipe.nutritionValues}
            servings={servings}
            setServings={setServings}
            servingsRatio={servingsRatio}
          />
        </Row>
        <Ingredients
          ingredients={recipe.ingredients}
          servings={servings}
          servingsRatio={servingsRatio}
        />
        <Title level={4}>Steps:</Title>
        {recipe.steps.map((step, idx) => {
          return (
            <div key={idx}>
              {idx + 1}. {step}
              <p></p>
            </div>);
        })}
      </div>
    </Row>
  );
};

export default RecipeInfo;
