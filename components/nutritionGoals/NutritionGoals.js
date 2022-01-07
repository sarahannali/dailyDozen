import React, {useState, useEffect, useRef} from 'react';
import {Typography, Row, Col, InputNumber, notification} from 'antd';
import GoalCard from './GoalCard';
import { IsNotMacro } from './utils';
import axios from 'axios';

const {Title} = Typography;

const NutritionGoals = ({allNutritionData}) => {
  const [nutritionGoals, setNutritionGoals] = useState(allNutritionData);

  const updateNutritionGoals = (type, value) => {
    setNutritionGoals({...nutritionGoals, [type]: Number(value)})
  }

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      axios.post('/api/routes/goals', nutritionGoals)
      .then(function (response) {
        notification['success']({
          message: 'Changes Saved',
        });
      })
      .catch(function (error) {
        notification['error']({
          message: 'Error',
        });
      });
    }

    firstRender.current = false;
  }, [nutritionGoals]);

  return (
    <div>
      <Row justify="center" style={{marginBottom: '10px'}}>
        <Title level={2}>Nutrition Goals</Title>
      </Row>
      <Row>
        <Col span={2}></Col>
        <Col span={10}>
          <Row>
            <Title level={4}>Calories</Title>
          </Row>
          <Row>
            <InputNumber
              defaultValue={nutritionGoals["calories"]}
              onBlur={(e) => updateNutritionGoals("calories", e.target.value)} />
          </Row>
        </Col>
        <Col style={{marginLeft: 'auto'}}>
          <Row>
            <Title level={4}>Carbs</Title>
          </Row>
          <Row>
            <InputNumber
              defaultValue={nutritionGoals["carbs"]}
              onBlur={(e) => updateNutritionGoals("carbs", e.target.value)}
            />
          </Row>
        </Col>
        <Col span={1}></Col>
        <Col>
          <Row>
            <Title level={4}>Fat</Title>
          </Row>
          <Row>
            <InputNumber
              defaultValue={nutritionGoals["fat"]}
              onBlur={(e) => updateNutritionGoals("fat", e.target.value)}
            />
          </Row>
        </Col>
        <Col span={1}></Col>
        <Col>
          <Row>
            <Title level={4}>Protein</Title>
          </Row>
          <Row>
            <InputNumber
              defaultValue={nutritionGoals["protein"]}
              onBlur={(e) => updateNutritionGoals("protein", e.target.value)}
            />
          </Row>
        </Col>
        <Col span={2}></Col>
      </Row>
      <Row justify="center" style={{marginTop: '40px'}}>
        {
          Object.keys(nutritionGoals).sort().map((goal) => {
            return IsNotMacro(goal)
            ? (
              <Col xs={9} key={goal}>
                <GoalCard
                  name={goal}
                  amount={nutritionGoals[goal]}
                  updateNutritionGoals={updateNutritionGoals}
                />
              </Col>)
            : null;
          })
        }
      </Row>
    </div>
  );
};

export default NutritionGoals;
