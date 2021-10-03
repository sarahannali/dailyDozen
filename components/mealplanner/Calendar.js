import React from 'react';
import SingleDay from './SingleDay';
import PropTypes from 'prop-types';
import {Row} from 'antd';
import classes from '../css/mealplanner.module.css';

const Calendar = ({days}) => {
  return (<Row>
    <div className={classes.Calendar}>
      {days.map((day) =>
        <SingleDay
          day={day.id}
          meals={day.meals}
          date={day.date}
          key={day.id}
        />,
      )}
    </div>
  </Row>);
};

Calendar.propTypes = {
  days: PropTypes.object,
};

export default Calendar;
