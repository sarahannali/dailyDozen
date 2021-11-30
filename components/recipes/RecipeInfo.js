import React from 'react';
import {Typography, Row, Col} from 'antd';
import { Capitalize } from '../common';
import classes from '../css/recipes.module.css';

const {Title} = Typography;

const RecipeInfo = ({ recipe }) => {
  return (
    <Row justify="center">
      <div style={{height: "80vh", width: "60vw"}}>
        <Row style={{marginBottom: '15px'}}>
          <Col>
            <img src={recipe.imageURL} className={classes.recipeInfoImg} />
          </Col>
          <Col span={1} />
          <Col>
          </Col>
        </Row>
        <Row justify="center">
          {Object.keys(recipe.nutritionValues).sort().map(key => {
            const keyFormatted = Capitalize(key);
            const type = key == "protein" || key == "carbs" || key == "fat" ? "g" : "";

            return (
              <div className={classes.nutritionGoal} key={key}>
                <strong>{keyFormatted}</strong>: {recipe.nutritionValues[key]}{type}
              </div>
            )
          })}
        </Row>
        <div className={classes.ingredients}>
          <Title level={4}>Ingredients:</Title>
          <ul>
            {recipe.ingredients.map((ingr, idx) => {
              return (
                <li key={idx}>
                  {ingr.amount} {ingr.name}
                </li>
              );
            })}
          </ul>
        </div>
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
