import React from 'react';
import {
  Card, Row, Col, Typography, Input, Progress, Skeleton,
} from 'antd';
import Image from 'next/image';
import { NutritionGoals } from 'utils/propTypes/db';
import classes from 'components/css/nutritionGoals.module.css';
import { Capitalize, GetBorderColor, GetNutritionGoalImg } from 'components/common';

const { Text } = Typography;

type GoalCardProps = {
  name: keyof NutritionGoals,
  amount: number,
  loading: boolean,
  updateNutritionGoals: (type: string, value: number) => void
}

function GoalCard({
  name, amount, loading, updateNutritionGoals,
}: GoalCardProps) {
  const img = (
    <Image
      className={classes.goalImg}
      src={GetNutritionGoalImg(name)}
      width={40}
      height={40}
    />
  );

  return (
    <div>
      <Card className={classes.card} title={Capitalize(name)}>
        <Row style={{ alignItems: 'center' }}>
          <Col>
            <Progress
              type="circle"
              percent={100}
              format={() => img}
              strokeColor={GetBorderColor(name)}
              width={100}
            />
          </Col>
          <Col>
            <Row style={{ lineHeight: '2', marginRight: '5px', marginLeft: '30px' }}>
              <Text>Daily Goal: </Text>
            </Row>
          </Col>
          <Col>
            <Row style={{ margin: '5px', width: '150px' }}>
              {
                loading
                  ? <Skeleton.Input style={{ width: '150px' }} />
                  : (
                    <Input
                      type="number"
                      addonAfter="g"
                      defaultValue={amount}
                      min={0}
                      onBlur={(e) => updateNutritionGoals(name, Number(e.target.value))}
                    />
                  )
              }
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default GoalCard;
