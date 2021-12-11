import React, { useState, useEffect } from 'react';
import {Typography, Row, Col, Input} from 'antd';
import {RecipeCard} from './components';
import { searchRecipes } from './requests';

const {Title} = Typography;

const {Search} = Input;

const Recipes = ({recipes}) => {
  const [currRecipes, setCurrRecipes] = useState(recipes);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search == "") setCurrRecipes(recipes);
    else {
      (async () => {
        const foundRecipes = await searchRecipes();
        setCurrRecipes(foundRecipes);
      })()
    }
  }, [search])

  return (
    <div>
      <Row justify="center" style={{marginBottom: '10px'}}>
        <Title level={2}>Recipes</Title>
      </Row>
      <Row>
        <Col span={3}></Col>
        <Col span={5}>
          <Search onBlur={(e) => setSearch(e.target.value)} onPressEnter={(e) => setSearch(e.target.value)} />
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
