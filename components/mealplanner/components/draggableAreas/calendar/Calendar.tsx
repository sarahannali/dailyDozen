import React from 'react';
import { Row } from 'antd';
import SingleDay from './SingleDay';
import classes from './calendar.module.css';
import { Calendar } from '../../../utils/_populateCalendar';
import { MealEvent, NutritionGoalsWithMacros } from '../../../../../utils/propTypes';

type CalendarProps = {
  days: Calendar,
  nutritionGoalData: NutritionGoalsWithMacros,
  deleteMealEvent: (mealEventID: string, codes: string, sourceIdx: number) => Promise<void>,
  updateMealEvent: (movedObj: MealEvent, codes: string, sourceIdx: number) => Promise<void>
}

function Calendar({
  days, nutritionGoalData, deleteMealEvent, updateMealEvent,
}: CalendarProps) {
  return (
    <Row>
      <div className={classes.calendar}>
        {days.map((day) => (
          <SingleDay
            meals={day.meals}
            date={day.date}
            key={day.id}
            nutritionGoalData={nutritionGoalData}
            deleteMealEvent={deleteMealEvent}
            updateMealEvent={updateMealEvent}
          />
        ))}
      </div>
    </Row>
  );
}

export default Calendar;
