import React, { Fragment } from 'react';
import { Progress, Row } from 'antd';
import Image from 'next/image';
import type {
  NutritionGoals,
  NutritionGoalsWithMacros, Macros,
} from 'utils/propTypes/db';
import classes from 'components/css/mealPlanner.module.css';
import type { Meals } from 'components/pages/mealplanner/types';
import { GetNutritionGoalImg, GetBorderColor, Capitalize } from 'components/common';
import GetNutritionTotals from './utils';

type DailyNutritionInfoProps = {
  nutritionGoalData: NutritionGoalsWithMacros,
  meals: Meals
}

function DailyNutritionInfo({ nutritionGoalData, meals }: DailyNutritionInfoProps) {
  const nutritionInfo = GetNutritionTotals(nutritionGoalData, meals);
  const macros: Array<keyof Macros> = ['calories', 'carbs', 'fat', 'protein'];
  const nutritionTypes: Array<keyof NutritionGoals> = [
    'beans',
    'berries',
    'cruciferous',
    'flaxseed',
    'fruit',
    'grains',
    'greens',
    'nuts',
    'vegetables',
  ];

  return (
    nutritionInfo
      ? (
        <div className={classes.dailyNutritionDiv}>
          {macros.map((macro) => {
            const title = (
              <div className={classes.macroTitle}>
                {nutritionInfo[macro].toFixed(2)}
              </div>
            );
            return (
              <Fragment key={macro}>
                <strong className={classes.macroText}>{Capitalize(macro)}</strong>
                <Progress
                  percent={(nutritionInfo[macro] / nutritionGoalData[macro]) * 100}
                  format={() => title}
                  strokeColor="#3d4954"
                />
              </Fragment>
            );
          })}
          {nutritionTypes.map((type) => {
            const img = (
              <Image
                className={classes.goalImg}
                src={GetNutritionGoalImg(type as keyof NutritionGoals)}
                width={40}
                height={40}
              />
            );

            return (
              <Progress
                type="circle"
                percent={nutritionInfo[type] * 100}
                format={() => img}
                strokeColor={GetBorderColor(type)}
                width={100}
                key={type}
              />
            );
          })}
        </div>
      )
      : (
        <Row justify="center">
          <p className={classes.noMealsFoundText}>No Meals Found</p>
        </Row>
      )
  );
}

export default DailyNutritionInfo;
