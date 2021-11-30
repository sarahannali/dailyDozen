import React from 'react';
import {Card, Row, Col, Typography, Input} from 'antd';
import { Capitalize, GetBorderColor, GetNutritionGoalImg } from '../common';
import classes from '../css/nutritionGoals.module.css';

const {Text} = Typography;

const GoalCard = ({name, amount, updateNutritionGoals}) => {
  return (
    <div>
      <Card className={classes.card} title={Capitalize(name)}>
        <Row style={{alignItems: "center"}}>
          <Col>
            <div className={classes.goalImgBorder} style={{borderColor: GetBorderColor(name)}}>
              <img className={classes.goalImg} src={GetNutritionGoalImg(name)} />
            </div>
          </Col>
          <Col>
            <Row style={{lineHeight: '2', margin: '5px'}}>
              <Text>Daily Goal: </Text>
            </Row>
          </Col>
          <Col>
            <Row style={{margin: '5px', width: '150px'}}>
              <Input
                type="number"
                addonAfter="g"
                defaultValue={amount}
                onBlur={(e) => updateNutritionGoals(name, e.target.value)}
              />
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
};


export default GoalCard;
