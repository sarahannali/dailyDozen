import React from 'react';
import { Progress } from 'antd';
import Image from 'next/image';
import { GetBorderColor, GetNutritionGoalImg, GetNutritionValues } from '../../utils/nutritionGoals';
import classes from './recipeInfo.module.css';
import { NutritionGoals, NutritionGoalsWithMacros, RecipeIngredient } from '../../../../utils/propTypes';

type NutritionValuesProps = {
  ingredients: RecipeIngredient[],
  nutritionGoalData: NutritionGoals,
  servings: number,
  servingsRatio: number
}

function NutritionValues({
  ingredients, nutritionGoalData, servings, servingsRatio,
}: NutritionValuesProps) {
  const nutritionValues = GetNutritionValues(
    ingredients,
    nutritionGoalData as NutritionGoalsWithMacros,
    servings,
    servingsRatio,
  );

  return (
    <div className={classes.nutritionValues}>
      {
        (Object.keys(nutritionValues) as Array<keyof NutritionGoals>).map((val) => {
          const img = (
            <Image
              width={30}
              height={30}
              src={GetNutritionGoalImg(val)}
              className={classes.goalImg}
            />
          );

          return nutritionValues[val] !== 0 && (
            <div className={classes.nutritionValueImg} key={val}>
              <Progress
                type="circle"
                percent={nutritionValues[val] * 100}
                format={() => img}
                strokeColor={GetBorderColor(val)}
                width={70}
              />
            </div>
          );
        })
      }
    </div>
  );
}

export default NutritionValues;
