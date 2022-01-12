import React from 'react';
import { Typography } from 'antd';
import classes from './recipeInfo.module.css';
import { ConvertGramsToUnits } from '../../../common';
import { RecipeIngredient } from '../../../../utils/propTypes';

const { Title } = Typography;

type IngredientsProps = {
  ingredients: Array<RecipeIngredient>,
  servings: number,
  servingsRatio: number
}

function Ingredients({ ingredients, servings, servingsRatio }: IngredientsProps) {
  const GetAmount = (strAmount: number, grams: number, ratio: number) => {
    if (servings === servingsRatio) return strAmount;

    const [amount, amountType] = ConvertGramsToUnits((grams / servingsRatio) * servings, ratio);
    return `${parseFloat(amount.toFixed(2))} ${amountType}`;
  };

  return (
    <div className={classes.ingredients}>
      <Title level={4}>Ingredients:</Title>
      <ul>
        {ingredients.map((ingr) => (
          <li key={ingr.name}>
            {GetAmount(ingr.amount, ingr.grams, ingr.ratio)}
            {' '}
            {ingr.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ingredients;
