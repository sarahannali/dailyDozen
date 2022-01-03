import React from 'react';
import { Tooltip, Progress } from 'antd';
import { GetBorderColor, GetNutritionGoalImg } from '../../../common';
import { GetNutritionValues } from '../../../common';
import classes from './recipeInfo.module.css';

const NutritionValues = ({ingredients, nutritionGoalData, servings, servingsRatio}) => {
  const nutritionValues = GetNutritionValues(ingredients, nutritionGoalData, servings, servingsRatio);

  return (
    <div className={classes.nutritionValues}>
      {
        Object.keys(nutritionValues).map(val => {
          return nutritionValues[val] != 0 && (
            <div className={classes.nutritionValueImg} key={val}>
              <Tooltip title={val}>
                <Progress
                  type="circle"
                  percent={nutritionValues[val] * 100}
                  format={() => <img className={classes.goalImg} src={GetNutritionGoalImg(val)} />}
                  strokeColor={GetBorderColor(val)}
                  width={70}
                />
              </Tooltip>
            </div>
          )
        })
      }
    </div>
  )
};

export default NutritionValues;