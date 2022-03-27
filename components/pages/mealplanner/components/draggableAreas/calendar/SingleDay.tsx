import React, { useState } from 'react';
import { Col, Modal, Typography } from 'antd';
import type { MealEvent, NutritionGoalsWithMacros } from 'utils/propTypes/db';
import classes from 'components/css/mealPlanner.module.css';
import { Meals } from 'components/pages/mealplanner/types';
import { CalendarDays } from 'components/pages/mealplanner/utils';
import MealTime from './MealTime';
import DailyNutritionInfo from './dailyNutritionInfo';

const { Title } = Typography;

type SingleDayProps = {
  date: Date,
  meals: Meals,
  nutritionGoalData: NutritionGoalsWithMacros,
  deleteMealEvent: (mealEventID: string, codes: string, sourceIdx: number) => Promise<void>,
  updateMealEvent: (movedObj: MealEvent, codes: string, sourceIdx: number) => Promise<void>
}

function SingleDay({
  date, meals, nutritionGoalData, deleteMealEvent, updateMealEvent,
}: SingleDayProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dayOfWeek = CalendarDays[date.getDay()];
  const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
  const day = date.toDateString();

  return (
    <Col className={classes.singleDayCol}>
      <div className={classes.singleDayTitleDiv}>
        <Title
          level={3}
          onClick={() => setIsModalVisible(true)}
          className={classes.singleDayTitle}
        >
          {dayOfWeek}
        </Title>
        <Title
          level={5}
          className={classes.singleDaySubtitle}
        >
          {dateStr}
        </Title>
      </div>
      {(Object.keys(meals) as Array<keyof Meals>).map((mealTime) => (
        <MealTime
          key={day + mealTime}
          day={day}
          mealTime={mealTime}
          meals={meals[mealTime]}
          deleteMealEvent={deleteMealEvent}
          updateMealEvent={updateMealEvent}
        />
      ))}
      <Modal
        title={`${dayOfWeek} ${dateStr}`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className={classes.dailyNutritionModal}
      >
        <DailyNutritionInfo nutritionGoalData={nutritionGoalData} meals={meals} />
      </Modal>
    </Col>
  );
}

export default SingleDay;
