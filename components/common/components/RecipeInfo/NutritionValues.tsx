import React from 'react';
import { Progress, Col } from 'antd';
import Image from 'next/image';
import type {
  NutritionGoals,
  NutritionGoalsWithMacros,
  RecipeIngredient,
} from 'utils/propTypes/db';
import classes from 'components/css/recipeInfo.module.css';
import {
  GetBorderColor,
  GetNutritionGoalImg,
  GetNutritionValues,
} from '../../utils/nutritionGoals';

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
    <>
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
            <Col span={4}>
              <Progress
                type="circle"
                percent={nutritionValues[val] * 100}
                format={() => img}
                strokeColor={GetBorderColor(val)}
                width={70}
              />
            </Col>
          );
        })
      }
    </>
  );
}

export default NutritionValues;
