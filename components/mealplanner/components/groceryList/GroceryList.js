import React, { useState, useEffect } from 'react';
import { Select, Checkbox, Row } from 'antd';
import { GetGroceryList, ConvertAmount } from './utils';

const { Option } = Select;

const GroceryList = ({days}) => {
  const [groceryList, setGroceryList] = useState(GetGroceryList(days))

  useEffect(() => {
    setGroceryList(GetGroceryList(days));
  }, [days])

  const handleChange = (amount, orgType, newType, idx) => {
    const newList = [...groceryList];
    newList[idx].amount = ConvertAmount(amount, orgType, newType);
    newList[idx].amountType = newType;
    setGroceryList(newList);
  }

  return (
    <div>
      <ul>
      {groceryList.map((ingredient, idx) => {
        return (
          <Row>
            <Checkbox>
              {ingredient.amount.toFixed(2)}
              <Select
                value={ingredient.amountType}
                style={{ margin: "5px 10px" }}
                onChange={(type) => handleChange(ingredient.amount, ingredient.amountType, type, idx)}
              >
                <Option value="gal">gal</Option>
                <Option value="cup">cup</Option>
                <Option value="tbs">tbs</Option>
                <Option value="tsp">tsp</Option>
              </Select>
              {ingredient.name}
            </Checkbox>
          </Row>
        )
      })}
      </ul>
    </div>
  );
};

export default GroceryList;
