import React, {useState} from 'react';
import {Col, Modal, Typography} from 'antd';
import MealTime from './MealTime';
import {DailyNutritionInfo} from './dailyNutritionInfo';
import {CalendarDays} from '../../../utils'
import classes from './calendar.module.css';

const {Title} = Typography;

const SingleDay = ({date, meals, nutritionGoalData, deleteMealEvent, updateMealEvent}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dayOfWeek = CalendarDays[date.getDay()];
  const day = date.toDateString();

  return (
    <Col className={classes.singleDayCol}>
      <div style={{textAlign: "center"}}>
        <Title level={3} style={{marginBottom: "0px"}} onClick={() => setIsModalVisible(true)} className={classes.singleDayTitle}>
          {dayOfWeek}
        </Title>
        <Title level={5} style={{marginTop: "0px"}}>{(date.getMonth() + 1) + "/" + date.getDate()}</Title>
      </div>
      {Object.keys(meals).map((mealTime) =>
        <MealTime
          key={day + mealTime}
          day={day}
          mealTime={mealTime}
          meals={meals[mealTime]}
          deleteMealEvent={deleteMealEvent}
          updateMealEvent={updateMealEvent}
        />
      )}
      <Modal
        title={day}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <DailyNutritionInfo nutritionGoalData={nutritionGoalData} />
      </Modal>
    </Col>
  );
};

export default SingleDay;
