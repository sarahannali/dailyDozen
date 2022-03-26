import React from 'react';
import { Progress, Row } from 'antd';
import Image from 'next/image';
import { GetNutritionGoalImg, GetBorderColor, Capitalize } from '../../../../../../common';
import { GetNutritionTotals } from './utils';
import classes from './dailyNutritionInfo.module.css';
import { NutritionGoals, NutritionGoalsWithMacros, Macros } from 'utils/propTypes/db';
import { Meals } from '../../../../utils/_populateCalendar';

type DailyNutritionInfoProps = {
  nutritionGoalData: NutritionGoalsWithMacros,
  meals: Meals
}

function DailyNutritionInfo({ nutritionGoalData, meals }: DailyNutritionInfoProps) {
  const nutritionInfo = GetNutritionTotals(nutritionGoalData, meals);
  const macros: Array<keyof Macros> = ['calories', 'carbs', 'fat', 'protein'];
  const nutritionTypes: Array<keyof NutritionGoals> = [
    'beans', 'berries', 'cruciferous', 'flaxseed', 'fruit', 'grains', 'greens', 'nuts', 'vegetables',
  ];

  return (
    nutritionInfo
      ? (
        <div className={classes.modal}>
          {macros.map((macro) => {
            const title = <div style={{ color: 'black' }}>{nutritionInfo[macro].toFixed(2)}</div>;
            return (
              <>
                <strong style={{ marginBottom: '-30px' }}>{Capitalize(macro)}</strong>
                <Progress
                  percent={(nutritionInfo[macro] / nutritionGoalData[macro]) * 100}
                  format={() => title}
                  strokeColor="#3d4954"
                />
              </>
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
              />
            );
          })}
        </div>
      )
      : (
        <Row justify="center">
          <p style={{ color: '#8c8c8c' }}>No Meals Found</p>
        </Row>
      )
  );
}

export default DailyNutritionInfo;
