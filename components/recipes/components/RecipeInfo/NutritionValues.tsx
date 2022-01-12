import React from 'react';
import { Tooltip, Progress } from 'antd';
import Image from 'next/image';
import { GetBorderColor, GetNutritionGoalImg, GetNutritionValues } from '../../../common';
import classes from './recipeInfo.module.css';
import { NutritionGoals, RecipeIngredient } from '../../../../utils/propTypes';

type NutritionValuesProps = {
  ingredients: Array<RecipeIngredient>,
  nutritionGoalData: NutritionGoals,
  servings: number,
  servingsRatio: number
}

function NutritionValues({
  ingredients, nutritionGoalData, servings, servingsRatio,
}: NutritionValuesProps) {
  const nutritionValues = GetNutritionValues(
    ingredients,
    nutritionGoalData,
    servings,
    servingsRatio,
  );

  return (
    <div className={classes.nutritionValues}>
      {
        (Object.keys(nutritionValues) as Array<keyof NutritionGoals>).map((val) => {
          const img = <Image className={classes.goalImg} src={GetNutritionGoalImg(val)} />;

          return nutritionValues[val] !== 0 && (
            <div className={classes.nutritionValueImg} key={val}>
              <Tooltip title={val}>
                <Progress
                  type="circle"
                  percent={nutritionValues[val] * 100}
                  format={() => img}
                  strokeColor={GetBorderColor(val)}
                  width={70}
                />
              </Tooltip>
            </div>
          );
        })
      }
    </div>
  );
}

export default NutritionValues;
