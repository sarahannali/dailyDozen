import React from 'react';
import {InputNumber} from 'antd';
import { Capitalize } from '../../../common';
import classes from './recipeInfo.module.css';

const MacroValues = ({values, servings, setServings, servingsRatio}) => {
  return Object.keys(values).sort().map(value => {
    const keyFormatted = Capitalize(value);
    
    if (value != "servings") {
      const amount = parseFloat((values[value] * (servings / servingsRatio)).toFixed(2));
      return (
        <div className={classes.nutritionGoal} key={value}>
          <strong>{keyFormatted}</strong>: {amount}{value != "calories" ? "g" : ""}
        </div>
      )
    }

    return (
      <div className={classes.nutritionGoal} key={value}>
        <strong>{keyFormatted}</strong>: 
        <InputNumber
          defaultValue={servings}
          onChange={(e) => setServings(e)}
          style={{width: '75px', marginLeft: '10px'}}
          min={1}
        />
      </div>
    )
  });
};

export default MacroValues;