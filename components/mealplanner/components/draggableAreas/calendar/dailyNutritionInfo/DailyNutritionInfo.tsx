import React from 'react';
import { Progress } from 'antd';
import Image from 'next/image';
import { GetNutritionGoalImg, GetBorderColor, Capitalize } from '../../../../../common';
import { GetNutritionTotals } from './utils';
import classes from './dailyNutritionInfo.module.css';
import { NutritionGoalsWithMacros } from '../../../../../../utils/propTypes';
import { Meals } from '../../../../utils/_populateCalendar';

type DailyNutritionInfoProps = {
  nutritionGoalData: NutritionGoalsWithMacros,
  meals: Meals
}

function DailyNutritionInfo({ nutritionGoalData, meals }: DailyNutritionInfoProps) {
  const nutritionInfo = GetNutritionTotals(nutritionGoalData, meals);
  const macros = ['calories', 'carbs', 'fat', 'protein'];

  return (
    <div className={classes.modal}>
      {(Object.keys(nutritionInfo) as Array<keyof NutritionGoalsWithMacros>).map((goal) => {
        if (goal in macros) {
          const title = <div style={{ color: 'black' }}>{nutritionInfo[goal].toFixed(2)}</div>;
          return (
            <>
              <strong style={{ marginBottom: '-30px' }}>{Capitalize(goal)}</strong>
              <Progress
                percent={(nutritionInfo[goal] / nutritionGoalData[goal]) * 100}
                format={() => title}
                strokeColor="#001529"
              />
            </>
          );
        }

        const img = <Image className={classes.goalImg} src={GetNutritionGoalImg(goal)} />;
        return (
          <Progress
            type="circle"
            percent={nutritionInfo[goal] * 100}
            format={() => img}
            strokeColor={GetBorderColor(goal)}
            width={100}
          />
        );
      })}
    </div>
  );
}

export default DailyNutritionInfo;
