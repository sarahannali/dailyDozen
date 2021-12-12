import React, { useState } from 'react';
import {Typography, Row, Col} from 'antd';
import {RecipeCard} from './components';
import { SearchBar } from '../common';

const {Title} = Typography;

const Recipes = ({recipes, nutritionGoalData}) => {
  const [currRecipes, setCurrRecipes] = useState(recipes);
  
  return (
    <div>
      <Row justify="center" style={{marginBottom: '10px'}}>
        <Title level={2}>Recipes</Title>
      </Row>
      <Row>
        <Col span={3}></Col>
        <Col>
          <SearchBar 
            allData={recipes}
            setData={setCurrRecipes}
            searchKeys={['name']}
          />
        </Col>
        <Col span={2}></Col>
      </Row>
      <Row justify="center" style={{marginTop: '40px'}}>
        <Col span={2}></Col>
        <Col span={20}>
          <Row>
            {
              currRecipes.map((recipe, idx) => {
                return (
                  <Col
                    xs={24}
                    xl={7}
                    key={idx}
                    style={{marginBottom: '20px'}}
                  >
                    <RecipeCard
                      recipe={recipe}
                      nutritionGoalData={nutritionGoalData}
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
