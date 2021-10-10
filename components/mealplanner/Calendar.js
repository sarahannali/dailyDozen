import React from 'react';
import SingleDay from './SingleDay';
import {Row} from 'antd';
import classes from '../css/mealplanner.module.css';

const Calendar = ({days}) => {
  return (<Row>
    <div className={classes.calendar}>
      {days.map((day) =>
        <SingleDay
          day={day.id}
          meals={day.meals}
          date={day.date}
          key={day.id}
        />
      )}
    </div>
  </Row>);
};

export default Calendar;
