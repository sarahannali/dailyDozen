import React from 'react';
import { Capitalize } from '../../../common';
import classes from './recipeInfo.module.css';

const MacroValues = ({values, servings, servingsRatio}) => {
  return Object.keys(values).sort().map(value => {
    const keyFormatted = Capitalize(value);
    
    const amount = parseFloat((values[value] * (servings / servingsRatio)).toFixed(2));
    return (
      <div className={classes.nutritionGoal} key={value}>
        <strong>{keyFormatted}</strong>: {amount}{value != "calories" ? "g" : ""}
      </div>
    )
  });
};

export default MacroValues;