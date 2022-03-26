import React, { useEffect, useState } from 'react';
import { Row, Spin } from 'antd';
import { MealEvent } from 'utils/propTypes/db';
import { getMealEvents, getNutritionGoalData } from 'components/requests';
import SingleDay from './SingleDay';
import classes from './calendar.module.css';
import { Calendar as CalendarType } from '../../../utils/_populateCalendar';
import { PopulateCalendar } from '../../../utils';
import { EmptyNutritionGoalsWithMacros } from '../../../../../../utils/constants/goals';

type CalendarProps = {
  days: CalendarType,
  setDays: React.Dispatch<React.SetStateAction<CalendarType>>,
  deleteMealEvent: (mealEventID: string, codes: string, sourceIdx: number) => Promise<void>,
  updateMealEvent: (movedObj: MealEvent, codes: string, sourceIdx: number) => Promise<void>
}

function Calendar({
  days, setDays, deleteMealEvent, updateMealEvent,
}: CalendarProps) {
  const [loading, setLoading] = useState(true);
  const [nutritionGoalData, setNutritionGoalData] = useState(EmptyNutritionGoalsWithMacros);

  useEffect(() => {
    const todaysDate = new Date();

    getMealEvents(todaysDate.toDateString())
      .then((res) => {
        setDays(PopulateCalendar(res, todaysDate));
        setLoading(false);
      });

    getNutritionGoalData()
      .then((res) => {
        if (res) setNutritionGoalData(res);
      });
  }, [setDays]);

  return (
    <Row>
      <Spin spinning={loading}>
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
      </Spin>
    </Row>
  );
}

export default Calendar;
