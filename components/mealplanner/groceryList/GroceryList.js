import React, { useState, useEffect } from 'react';
import { GetGroceryList, ConvertAmount } from './utils';
import { Select } from 'antd';
import {
  PrinterOutlined,
  MailOutlined
} from '@ant-design/icons';

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
      <PrinterOutlined />
      <MailOutlined />
      <ul>
      {groceryList.map((ingredient, idx) => {
        return (<li>
          {ingredient.amount.toFixed(2)}
          <Select defaultValue={ingredient.amountType} style={{ margin: "5px 10px" }} onChange={(type) => handleChange(ingredient.amount, ingredient.amountType, type, idx)}>
            <Option value="gal">gal</Option>
            <Option value="cup">cup</Option>
            <Option value="tbs">tbs</Option>
            <Option value="tsp">tsp</Option>
          </Select>
          {ingredient.name}
        </li>)
      })}
      </ul>
    </div>
  );
};

export default GroceryList;
