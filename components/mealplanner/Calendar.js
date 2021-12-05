import React from 'react';
import SingleDay from './SingleDay';
import {Row} from 'antd';
import classes from '../css/mealplanner.module.css';

const Calendar = ({days, allNutritionData, deleteMealEvent, updateServings}) => {
  return (<Row>
    <div className={classes.calendar}>
      {days.map((day) =>
        <SingleDay
          meals={day.meals}
          date={day.date}
          key={day.id}
          allNutritionData={allNutritionData}
          deleteMealEvent={deleteMealEvent}
          updateServings={updateServings}
        />
      )}
    </div>
  </Row>);
};

export default Calendar;
