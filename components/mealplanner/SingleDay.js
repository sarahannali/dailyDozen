import React, {useState} from 'react';
import {Col, Modal} from 'antd';
import MealTime from './MealTime';
import {Typography} from 'antd';
import DailyNutritionInfo from './dailyNutritionInfo/DailyNutritionInfo';
import classes from '../css/mealplanner.module.css';

const {Title} = Typography;

const SingleDay = ({day, date, meals, allNutritionData}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  return (
    <Col className={classes.singleDayCol}>
      <Title level={3} onClick={showModal} className={classes.singleDayTitle}>
        {day}
        <Title level={5}>{date}</Title>
      </Title>
      {meals.map((meal) =>
        <MealTime
          day={day}
          mealTime={meal.id}
          meals={meal.recipes}
          key={meal.id}
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
