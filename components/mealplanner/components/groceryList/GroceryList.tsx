import React, { useState, useEffect } from 'react';
import { Select, Checkbox, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { UpdateGroceryList, ConvertAmount } from './utils';
import { postGroceryList } from './requests/post';
import { GroceryItem, AmountType } from '../../../../utils/propTypes';
import { Calendar } from '../../utils/_populateCalendar';

const { Option } = Select;

type GroceryListProps = {
  days: Calendar,
  originalGroceryList: GroceryItem[]
}

function GroceryList({ days, originalGroceryList }: GroceryListProps) {
  const [groceryList, setGroceryList] = useState(originalGroceryList);

  const updateAndPostGroceryList = (updatedGroceryList: GroceryItem[]) => {
    setGroceryList(updatedGroceryList);
    postGroceryList(updatedGroceryList);
  };

  useEffect(() => {
    const updatedGroceryList = UpdateGroceryList(groceryList, days);

    updateAndPostGroceryList(updatedGroceryList);
  }, [days, groceryList]);

  const handleChange = (amount: number, orgType: AmountType, newType: AmountType, idx: number) => {
    const updatedGroceryList = [...groceryList];
    updatedGroceryList[idx].amount = ConvertAmount(amount, orgType, newType);
    updatedGroceryList[idx].amountType = newType;

    updateAndPostGroceryList(updatedGroceryList);
  };

  const handleChecked = (e: CheckboxChangeEvent, idx: number) => {
    const updatedGroceryList = [...groceryList];
    updatedGroceryList[idx].checked = e.target.checked;

    updateAndPostGroceryList(updatedGroceryList);
  };

  return (
    <div>
      <ul>
        {groceryList.map((ingredient, idx) => (
          <Row>
            <Checkbox
              defaultChecked={ingredient.checked}
              onChange={(e) => handleChecked(e, idx)}
            >
              {ingredient.amount.toFixed(2)}
            </Checkbox>
            <Select
              value={ingredient.amountType}
              style={{ margin: '-5px 10px 10px 0px' }}
              onChange={(type) => handleChange(ingredient.amount, ingredient.amountType, type, idx)}
            >
              <Option value="gal">gal</Option>
              <Option value="cup">cup</Option>
              <Option value="tbs">tbs</Option>
              <Option value="tsp">tsp</Option>
            </Select>
            {ingredient.name}
          </Row>
        ))}
      </ul>
    </div>
  );
}

export default GroceryList;
