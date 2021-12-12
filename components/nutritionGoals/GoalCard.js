import React from 'react';
import {Card, Row, Col, Typography, Input, Progress} from 'antd';
import { Capitalize, GetBorderColor, GetNutritionGoalImg } from '../common';
import classes from '../css/nutritionGoals.module.css';

const {Text} = Typography;

const GoalCard = ({name, amount, updateNutritionGoals}) => {
  return (
    <div>
      <Card className={classes.card} title={Capitalize(name)}>
        <Row style={{alignItems: "center"}}>
          <Col>
            <Progress
              type="circle"
              percent={100}
              format={() => <img className={classes.goalImg} src={GetNutritionGoalImg(name)} />}
              strokeColor={GetBorderColor(name)}
              width={100}
            />
          </Col>
          <Col>
            <Row style={{lineHeight: '2', marginRight: '5px', marginLeft: '30px'}}>
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
