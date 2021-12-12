import React, { useState } from 'react';
import {Typography, Row, Col, Rate} from 'antd';
import MacroValues from './MacroValues';
import Ingredients from './Ingredients';
import NutritionValues from './NutritionValues';
import classes from './recipeInfo.module.css';

const {Title} = Typography;

const RecipeInfo = ({ recipe, nutritionGoalData }) => {
  const [servings, setServings] = useState(recipe.nutritionValues.servings)
  const servingsRatio = recipe.nutritionValues.servings;

  return (
    <Row justify="center">
      <div style={{height: "80vh", width: "60vw"}}>
        <Row style={{marginBottom: '15px'}}>
          <Col>
            <img src={recipe.imageURL} className={classes.recipeInfoImg} />
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
            values={recipe.nutritionValues}
            servings={servings}
            setServings={setServings}
            servingsRatio={servingsRatio}
          />
        </Row>
        <Row justify="center">
          <Rate />
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
