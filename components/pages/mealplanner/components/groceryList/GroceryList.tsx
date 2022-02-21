import React from 'react';
import { Select, Checkbox, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ConvertAmount } from './utils';
import { AmountType, GroceryItem } from '../../../../../utils/propTypes';

const { Option } = Select;

type GroceryListProps = {
  groceryList: GroceryItem[],
  updateAndPostGroceryList: (updatedGroceryList: GroceryItem[]) => void
}

function GroceryList({ groceryList, updateAndPostGroceryList }: GroceryListProps) {
  const handleChange = (ingredient: GroceryItem, newType: AmountType, idx: number) => {
    const updatedGroceryList = [...groceryList];
    updatedGroceryList[idx].amount = ConvertAmount(
      ingredient.amount,
      ingredient.amountType,
      newType,
      ingredient.ratio,
    );
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
              {ingredient.amount.toFixed(1)}
            </Checkbox>
            <Select
              value={ingredient.amountType}
              style={{ margin: '-5px 10px 10px 0px' }}
              onChange={(type) => handleChange(ingredient, type, idx)}
            >
              <Option value="gal">gal</Option>
              <Option value="cup">cup</Option>
              <Option value="tbs">tbs</Option>
              <Option value="tsp">tsp</Option>
              <Option value="g">g</Option>
            </Select>
            {ingredient.name}
          </Row>
        ))}
      </ul>
    </div>
  );
}

export default GroceryList;
