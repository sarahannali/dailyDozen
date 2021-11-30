import React from 'react';
import SingleDay from './SingleDay';
import {Row} from 'antd';
import classes from '../css/mealplanner.module.css';

const Calendar = ({days, allNutritionData}) => {
  return (<Row>
    <div className={classes.calendar}>
      {days.map((day) =>
        <SingleDay
          day={day.id}
          meals={day.meals}
          date={day.date}
          key={day.id}
          allNutritionData={allNutritionData}
        />
      )}
    </div>
  </Row>);
};

export default Calendar;
