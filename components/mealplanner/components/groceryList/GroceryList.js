import React, { useState, useEffect } from 'react';
import { Select, Checkbox, Row } from 'antd';
import { UpdateGroceryList, ConvertAmount } from './utils';
import { postGroceryList } from './requests/post';

const { Option } = Select;

const GroceryList = ({days, originalGroceryList}) => {
  const [groceryList, setGroceryList] = useState(originalGroceryList);

  const updateAndPostGroceryList = (updatedGroceryList) => {
    setGroceryList(updatedGroceryList);
    postGroceryList(updatedGroceryList);
  }

  useEffect(() => {
    const updatedGroceryList = UpdateGroceryList(groceryList, days)

    updateAndPostGroceryList(updatedGroceryList);
  }, [days])

  const handleChange = (amount, orgType, newType, idx) => {
    const updatedGroceryList = [...groceryList];
    updatedGroceryList[idx].amount = ConvertAmount(amount, orgType, newType);
    updatedGroceryList[idx].amountType = newType;

    updateAndPostGroceryList(updatedGroceryList);
  }

  const handleChecked = (e, idx) => {
    const updatedGroceryList = [...groceryList];
    updatedGroceryList[idx].checked = e.target.checked;

    updateAndPostGroceryList(updatedGroceryList);
  }

  return (
    <div>
      <ul>
      {groceryList.map((ingredient, idx) => {
        return (
          <Row>
            <Checkbox
              defaultChecked={ingredient.checked}
              onChange={(e) => handleChecked(e, idx)}
            >
              {ingredient.amount.toFixed(2)}
            </Checkbox>
            <Select
              value={ingredient.amountType}
              style={{ margin: "-5px 10px 10px 0px" }}
              onChange={(type) => handleChange(ingredient.amount, ingredient.amountType, type, idx)}
            >
              <Option value="gal">gal</Option>
              <Option value="cup">cup</Option>
              <Option value="tbs">tbs</Option>
              <Option value="tsp">tsp</Option>
            </Select>
            {ingredient.name}
          </Row>
        )
      })}
      </ul>
    </div>
  );
};

export default GroceryList;
