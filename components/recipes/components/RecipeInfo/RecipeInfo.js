import React, { useState } from 'react';
import {Typography, Row, Col, Rate, InputNumber} from 'antd';
import MacroValues from './MacroValues';
import Ingredients from './Ingredients';
import NutritionValues from './NutritionValues';
import classes from './recipeInfo.module.css';

const {Title} = Typography;

const RecipeInfo = ({ recipe, nutritionGoalData, setRecipeInfo }) => {
  const [servings, setServings] = useState(recipe.servings);
  const servingsRatio = recipe.servings;

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
            values={recipe.macros}
            servings={servings}
            servingsRatio={servingsRatio}
          />
        </Row>
        <Row justify="center">
            <strong>Servings</strong>: 
            <InputNumber
              defaultValue={servings}
              onChange={(e) => setServings(e)}
              style={{width: '75px', marginLeft: '10px'}}
              min={1}
            />
        </Row>
        <Row justify="center">
          <Rate 
            defaultValue={recipe.Rating} 
            onChange={(e) => setRecipeInfo(() => {
              return {Favorite: recipe.Favorite, Rating: e}
            })}
          />
        </Row>
        <Ingredients
          ingredients={recipe.ingredients}
          servings={servings}
          servingsRatio={servingsRatio}
        />
        <Row>
          <Title level={4}>Steps:</Title>
          {recipe.steps.map((step, idx) => {
            return (
              <div key={idx}>
                {idx + 1}. {step}
                <p></p>
              </div>);
          })}
        </Row>
      </div>
    </Row>
  );
};

export default RecipeInfo;
