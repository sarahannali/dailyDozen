import React from 'react';
import { Progress, Col, Row } from 'antd';
import { GetNutritionGoalImg, GetBorderColor, Capitalize } from '../../../../../common';
import { GetNutritionTotals, GetMacroTotals } from './utils';
import classes from './dailyNutritionInfo.module.css';

const DailyNutritionInfo = ({nutritionGoalData, meals}) => {
  const nutritionInfo = GetNutritionTotals(nutritionGoalData, meals);
  const macroInfo = GetMacroTotals(meals);
  
  return (
    <div className={classes.modal}>
      {Object.keys(macroInfo).map(macro => {
        return (
            <>
              <strong style={{marginBottom: '-30px'}}>{Capitalize(macro)}</strong>
              <Progress
                percent={(macroInfo[macro] / nutritionGoalData[macro]) * 100}
                format={() => <div style={{color: 'black'}}>{macroInfo[macro].toFixed(2)}</div>}
                strokeColor={"#001529"}
              />
            </>
        )
        })
      }

      {Object.keys(nutritionInfo).sort().map(goal => {
        return (
          <Progress
            type="circle"
            percent={nutritionInfo[goal] * 100}
            format={() => <img className={classes.goalImg} src={GetNutritionGoalImg(goal)} />}
            strokeColor={GetBorderColor(goal)}
            width={100}
          />
        )
      })
      }
    </div>
  );
};

export default DailyNutritionInfo;
