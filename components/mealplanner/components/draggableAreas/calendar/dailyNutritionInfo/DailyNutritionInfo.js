import React from 'react';
import { GetNutritionGoalImg, Capitalize, GetBorderColor } from '../../../../../common';
import classes from './dailyNutritionInfo.module.css';

const DailyNutritionInfo = ({allNutritionData}) => {
  return (
    <div className={classes.modal}>
      {allNutritionData.map(nutritionGoal => {
        return (
          <div className={classes.nutritionGoal}>
            <h4>{Capitalize(nutritionGoal.name)}</h4>
            <div className={classes.goalImgBorder} style={{borderColor: GetBorderColor(nutritionGoal.name)}}>
              <img src={GetNutritionGoalImg(nutritionGoal.name)} className={classes.goalImg} />
            </div>
          </div>
        )
      })
      }
    </div>
  );
};

export default DailyNutritionInfo;
