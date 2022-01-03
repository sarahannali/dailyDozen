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
          <Col>
            <Row>
              <Progress
                type="circle"
                percent={(macroInfo[macro] / nutritionGoalData[macro]) * 100}
                format={() => <div style={{color: 'black'}}>{macroInfo[macro].toFixed(2)}</div>}
                strokeColor={"#001529"}
                width={100}
              />
            </Row>
            <Row justify="center">
              <strong>{Capitalize(macro)}</strong>
            </Row>
          </Col>
        )
        })
      }

      {Object.keys(nutritionInfo).map(goal => {
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
