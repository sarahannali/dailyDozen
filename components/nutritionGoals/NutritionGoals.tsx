import React, { useState, useEffect } from 'react';
import {
  Typography, Row, Col, InputNumber, notification, Skeleton,
} from 'antd';
import GoalCard from './GoalCard';
import { IsNotMacro } from './utils';
import { NutritionGoals as NutritionGoalsType } from '../../utils/propTypes';
import { EmptyNutritionGoalsWithMacros, macros } from '../../utils/constants/goals';
import { Macros } from '../../utils/propTypes/db/Recipe';
import { Capitalize } from '../common';
import { getNutritionGoalData, postNutritionGoalData } from '../requests';

const { Title } = Typography;

function NutritionGoals() {
  const [loading, setLoading] = useState(true);
  const [nutritionGoals, setNutritionGoals] = useState(EmptyNutritionGoalsWithMacros);

  const updateNutritionGoals = (type: string, value: number) => {
    const updatedGoals = { ...nutritionGoals, [type]: value };

    setNutritionGoals(updatedGoals);

    postNutritionGoalData(updatedGoals)
      .then(() => {
        notification.success({
          message: 'Changes Saved',
        });
      })
      .catch(() => {
        notification.error({
          message: 'Error',
        });
      });
  };

  useEffect(() => {
    getNutritionGoalData()
      .then((res) => {
        setNutritionGoals(res);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Row justify="center" style={{ marginBottom: '10px' }}>
        <Title level={2}>Nutrition Goals</Title>
      </Row>
      <Row justify="center">
        {(macros as Array<keyof Macros>).map((macro) => (
          <Col
            key={macro}
            xs={3}
            offset={macro === 'carbs' ? 8 : 0}
          >
            <Row>
              <Title level={4}>{Capitalize(macro)}</Title>
            </Row>
            <Row>
              {
                loading
                  ? <Skeleton.Input style={{ width: '100px' }} />
                  : (
                    <InputNumber
                      defaultValue={nutritionGoals[macro]}
                      style={{ width: '100px' }}
                      min={0}
                      type="number"
                      onBlur={(e) => updateNutritionGoals(macro, Number(e.target.value))}
                    />
                  )
              }
            </Row>
          </Col>
        ))}
      </Row>
      <Row justify="center" style={{ marginTop: '40px' }}>
        {
          (Object.keys(nutritionGoals) as Array<keyof NutritionGoalsType>)
            .sort()
            .map((goal) => (IsNotMacro(goal)
              ? (
                <Col xs={9} key={goal}>
                  <GoalCard
                    name={goal as keyof NutritionGoalsType}
                    loading={loading}
                    amount={nutritionGoals[goal]}
                    updateNutritionGoals={updateNutritionGoals}
                  />
                </Col>
              )
              : null))
        }
      </Row>
    </div>
  );
}

export default NutritionGoals;
