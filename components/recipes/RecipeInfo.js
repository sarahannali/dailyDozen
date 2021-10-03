import React from 'react';
import {Typography, Row, Col} from 'antd';
import nutritionCalc from '../../lib/nutrition';
import classes from '../css/recipes.module.css';
import { getRecipeData } from '../../lib/recipes';

const {Title} = Typography;

const ColorMap = {
  'Vegetables': '#A2DDBC',
  'Fruits': '#FF7C7C',
  'Nuts': '#E9A8E2',
  'Grain': '#A8DBE9',
  'Beans': '#FDD09B',
};

// const NutritionBorder = styled.div`
//   border: 4px solid ${(props) => ColorMap[props.name]};
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   margin-right: 7px;
// `;

// NutritionBorder.propTypes = {
//   name: PropTypes.string,
// };

// const getNutritionImg = (id) => {
//   const goal = NutritionGoals.find((goal) => goal.id == id);

//   return goal.icon;
// };


const RecipeInfo = ({ recipe }) => {
  console.log("SARAH2: ", recipe);
  return (
    <Row justify="center">
      <div style={{height: "80vh", width: "60vw"}}>
        <Row justify="center">
          <Title>{recipe.name}</Title>
        </Row>
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
            const keyFormatted = key.charAt(0).toUpperCase() + key.slice(1);
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
