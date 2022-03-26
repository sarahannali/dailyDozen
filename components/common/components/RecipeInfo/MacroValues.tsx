import React from 'react';
import { Macros } from 'utils/propTypes/db';
import Capitalize from '../../utils/_capitalize';
import classes from './recipeInfo.module.css';

type MacroValuesProps = {
  values: Macros,
  servings: number,
  servingsRatio: number
}

function MacroValues({ values, servings, servingsRatio }: MacroValuesProps) {
  return (
    <>
      {(Object.keys(values) as Array<keyof Macros>).sort().map((value) => {
        const keyFormatted = Capitalize(value);

        const amount = parseFloat((values[value] * (servings / servingsRatio)).toFixed(2));
        return (
          <div className={classes.nutritionGoal} key={value}>
            <strong>{keyFormatted}</strong>
            :
            {' '}
            {amount}
            {value !== 'calories' ? 'g' : ''}
          </div>
        );
      })}
    </>
  );
}

export default MacroValues;
