import React, { useEffect, useState } from 'react';
import { Row, Spin } from 'antd';
import type { MealEvent } from 'utils/propTypes/db';
import { getMealEvents, getNutritionGoalData } from 'components/requests';
import { EmptyNutritionGoalsWithMacros } from 'utils/constants/goals';
import classes from 'components/css/mealPlanner.module.css';
import { PopulateCalendar } from 'components/pages/mealplanner/utils';
import SingleDay from './SingleDay';
import type { Calendar as CalendarType } from '../../../types';

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
