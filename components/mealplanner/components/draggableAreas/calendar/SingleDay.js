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
  const dateStr = (date.getMonth() + 1) + "/" + date.getDate();
  const day = date.toDateString();

  return (
    <Col className={classes.singleDayCol}>
      <div style={{textAlign: "center"}}>
        <Title level={3} style={{marginBottom: "0px"}} onClick={() => setIsModalVisible(true)} className={classes.singleDayTitle}>
          {dayOfWeek}
        </Title>
        <Title level={5} style={{marginTop: "0px"}}>{dateStr}</Title>
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
        title={dayOfWeek + " " + dateStr}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        style={{marginTop: '-50px'}}
      >
        <DailyNutritionInfo nutritionGoalData={nutritionGoalData} meals={meals} />
      </Modal>
    </Col>
  );
};

export default SingleDay;
