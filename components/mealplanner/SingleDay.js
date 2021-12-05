import React, {useState} from 'react';
import {Col, Modal} from 'antd';
import MealTime from './MealTime';
import {Typography} from 'antd';
import DailyNutritionInfo from './dailyNutritionInfo/DailyNutritionInfo';
import classes from '../css/mealplanner.module.css';
import {CalendarDays} from './utils'

const {Title} = Typography;

const SingleDay = ({date, meals, allNutritionData, deleteMealEvent, updateServings}) => {
  const dayOfWeek = CalendarDays[date.getDay()];
  const day = date.toDateString();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <Col className={classes.singleDayCol}>
      <Title level={3} onClick={showModal} className={classes.singleDayTitle}>
        {dayOfWeek}
        <Title level={5}>{(date.getMonth() + 1) + "/" + date.getDate()}</Title>
      </Title>
      {Object.keys(meals).map((mealTime) =>
        <MealTime
          day={day}
          mealTime={mealTime}
          meals={meals[mealTime]}
          key={mealTime}
          deleteMealEvent={deleteMealEvent}
          updateServings={updateServings}
        />,
      )}
      <Modal
        title={day}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <DailyNutritionInfo allNutritionData={allNutritionData} />
      </Modal>
    </Col>
  );
};

export default SingleDay;
