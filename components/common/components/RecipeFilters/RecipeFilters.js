import React, { useState, useEffect } from 'react';
import { Rate, InputNumber, Button, Select } from 'antd';
import Fuse from 'fuse.js';

import {
  PlusOutlined
} from '@ant-design/icons';
import { MacroFilter } from './components';

const RecipeFilters = ({allRecipes, setRecipes, allNutritionData}) => {
  console.log("RECIPES: ", allRecipes);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const keys = [];

    Object.keys(filters).forEach(filter => {
      console.log(filter);
    })
  }, [filters])

  return (
    <div>
      <Rate 
        onChange={(e) => setFilters(() => {
          return {...filters, Rating: e}
        })}
      />
      In (1) Serving:
      <MacroFilter />
      <Button type="primary" shape="circle" icon={<PlusOutlined />} size="small" /> add macro
      <Button type="primary" shape="circle" icon={<PlusOutlined />} size="small" /> add nutrition goal
      {
        Object.keys(allNutritionData).map(type => {
          return (
            <div key={type}>
              {type}: <InputNumber
                onBlur={(e) => setFilters(() => {
                  return {...filters, [type]: e.target.value}
                })}
              />
            </div>
          )
        })
      }
    </div>
  );
};

export default RecipeFilters;
