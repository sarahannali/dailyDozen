import React from 'react';
import { Typography } from 'antd';
import type { RecipeIngredient } from 'utils/propTypes/db';
import classes from 'components/css/recipeInfo.module.css';

const { Title } = Typography;

type IngredientsProps = {
  ingredients: RecipeIngredient[],
  servings: number,
  servingsRatio: number
}

function Ingredients({ ingredients, servings, servingsRatio }: IngredientsProps) {
  const GetAmount = (strAmount: number, grams: number) => {
    if (servings === servingsRatio) return strAmount;

    return `${((grams / servingsRatio) * servings).toFixed(2)}g`;
  };

  return (
    <div className={classes.ingredients}>
      <Title level={4}>Ingredients:</Title>
      <ul>
        {ingredients.map((ingr) => (
          <li key={ingr.name}>
            {GetAmount(ingr.amount, ingr.grams)}
            {' '}
            {ingr.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ingredients;
