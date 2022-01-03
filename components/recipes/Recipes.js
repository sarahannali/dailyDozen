import React, { useState, useEffect } from 'react';
import {Typography, Row, Col, Rate} from 'antd';
import {RecipeCard} from './components';
import { getRecipes } from './requests';
import { SearchBar } from '../common';

import {
  HeartFilled
} from '@ant-design/icons';

const {Title} = Typography;

const Recipes = ({recipes, nutritionGoalData}) => {
  const [baseRecipes, setBaseRecipes] = useState(recipes);
  const [currRecipes, setCurrRecipes] = useState(recipes);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    setCurrRecipes(baseRecipes);
  }, [baseRecipes]);

  const updateRecipes = async () => {
    const upToDateRecipes = await getRecipes();
    setBaseRecipes(upToDateRecipes);
  };
  
  return (
    <div>
      <Row justify="center" style={{marginBottom: '10px'}}>
        <Title level={2}>Recipes</Title>
      </Row>
      <Row>
        <Col span={3}></Col>
        <Col>
          <SearchBar 
            allData={baseRecipes}
            setData={setCurrRecipes}
            searchKeys={['name']}
          />
        </Col>
        <Col span={12}></Col>
        <Rate 
          count={1}
          value={showFavorites}
          character={<HeartFilled style={{color: showFavorites ? "#eb2f96" : "#caccce"}} />} 
          style={{color: '#eb2f96'}} 
          onChange={() => setShowFavorites(!showFavorites)}
        />
      </Row>
      <Row justify="center" style={{marginTop: '40px'}}>
        <Col span={2}></Col>
        <Col span={20}>
          <Row>
            {
              currRecipes.map((recipe, idx) => {
                if ((!showFavorites) || (showFavorites && recipe.Favorite)) {
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
                        updateRecipes={updateRecipes}
                      />
                    </Col>
                  )
                }
              })
            }
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Recipes;
