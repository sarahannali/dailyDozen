import React, { useState, useEffect, useRef } from 'react';
import {
  Typography, Row, Col, InputNumber, notification,
} from 'antd';
import axios from 'axios';
import GoalCard from './GoalCard';
import { IsNotMacro } from './utils';
import { NutritionGoals } from '../../utils/propTypes';

const { Title } = Typography;

type NutritionGoalsProps = {
  allNutritionData: NutritionGoals
}

function NutritionGoals({ allNutritionData }: NutritionGoalsProps) {
  const [nutritionGoals, setNutritionGoals] = useState(allNutritionData);

  const updateNutritionGoals = (type: string, value: number) => {
    setNutritionGoals({ ...nutritionGoals, [type]: value });
  };

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      axios.post('/api/routes/goals', nutritionGoals)
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
    }

    firstRender.current = false;
  }, [nutritionGoals]);

  return (
    <div>
      <Row justify="center" style={{ marginBottom: '10px' }}>
        <Title level={2}>Nutrition Goals</Title>
      </Row>
      <Row>
        <Col span={2} />
        <Col span={10}>
          <Row>
            <Title level={4}>Calories</Title>
          </Row>
          <Row>
            <InputNumber
              defaultValue={nutritionGoals.calories}
              onBlur={(e) => updateNutritionGoals('calories', Number(e.target.value))}
            />
          </Row>
        </Col>
        <Col style={{ marginLeft: 'auto' }}>
          <Row>
            <Title level={4}>Carbs</Title>
          </Row>
          <Row>
            <InputNumber
              defaultValue={nutritionGoals.carbs}
              onBlur={(e) => updateNutritionGoals('carbs', Number(e.target.value))}
            />
          </Row>
        </Col>
        <Col span={1} />
        <Col>
          <Row>
            <Title level={4}>Fat</Title>
          </Row>
          <Row>
            <InputNumber
              defaultValue={nutritionGoals.fat}
              onBlur={(e) => updateNutritionGoals('fat', Number(e.target.value))}
            />
          </Row>
        </Col>
        <Col span={1} />
        <Col>
          <Row>
            <Title level={4}>Protein</Title>
          </Row>
          <Row>
            <InputNumber
              defaultValue={nutritionGoals.protein}
              onBlur={(e) => updateNutritionGoals('protein', Number(e.target.value))}
            />
          </Row>
        </Col>
        <Col span={2} />
      </Row>
      <Row justify="center" style={{ marginTop: '40px' }}>
        {
          (Object.keys(nutritionGoals) as Array<keyof NutritionGoals>)
            .sort()
            .map((goal) => (IsNotMacro(goal)
              ? (
                <Col xs={9} key={goal}>
                  <GoalCard
                    name={goal}
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
