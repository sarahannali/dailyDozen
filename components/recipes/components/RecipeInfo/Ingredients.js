import React from 'react';
import {Typography} from 'antd';
import classes from './recipeInfo.module.css';
import { ConvertGramsToUnits } from '../../../common';

const {Title} = Typography;

const Ingredients = ({ingredients, servings, servingsRatio}) => {
  const GetAmount = (strAmount, grams, ratio) => {
    if (servings == servingsRatio) return strAmount;
    else {
      const [amount, amountType] = ConvertGramsToUnits((grams / servingsRatio) * servings, ratio);
      return parseFloat(amount.toFixed(2)) + " " + amountType;
    }
  }

  return (
    <div className={classes.ingredients}>
      <Title level={4}>Ingredients:</Title>
      <ul>
        {ingredients.map((ingr, idx) => {
          return (
            <li key={idx}>
              {GetAmount(ingr.amount, ingr.grams, ingr.ratio)} {ingr.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Ingredients;