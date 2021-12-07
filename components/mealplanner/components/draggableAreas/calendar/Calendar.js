import React from 'react';
import {Row} from 'antd';
import SingleDay from './SingleDay';
import classes from './calendar.module.css';

const Calendar = ({days, allNutritionData, deleteMealEvent, updateMealEvent}) => {
  return (<Row>
    <div className={classes.calendar}>
      {days.map((day) =>
        <SingleDay
          meals={day.meals}
          date={day.date}
          key={day.id}
          allNutritionData={allNutritionData}
          deleteMealEvent={deleteMealEvent}
          updateMealEvent={updateMealEvent}
        />
      )}
    </div>
  </Row>);
};

export default Calendar;
