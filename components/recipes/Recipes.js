import React from 'react';
import {Typography, Row, Col, Input} from 'antd';
import RecipeCard from './RecipeCard';

const {Title} = Typography;

const {Search} = Input;

const Recipes = ({recipes}) => {
  return (
    <div>
      <Row justify="center" style={{marginBottom: '10px'}}>
        <Title level={2}>Recipes</Title>
      </Row>
      <Row>
        <Col span={3}></Col>
        <Col span={5}>
          <Search />
        </Col>
        <Col span={2}></Col>
      </Row>
      <Row justify="center" style={{marginTop: '40px'}}>
        <Col span={2}></Col>
        <Col span={20}>
          <Row>
            {
              recipes.map((recipe, idx) => {
                return (
                  <Col
                    xs={24}
                    xl={7}
                    key={idx}
                    style={{marginBottom: '20px'}}
                  >
                    <RecipeCard
                      id={"A"}
                      image={recipe.imageURL}
                      name={recipe.name}
                    />
                  </Col>);
              })
            }
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Recipes;
