import React from 'react';
import { Select, Checkbox, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import type { AmountType, GroceryItem } from 'utils/propTypes/db';
import classes from 'components/css/mealPlanner.module.css';
import { ConvertAmount } from './utils';

const { Option } = Select;

type GroceryListProps = {
  groceryList: GroceryItem[],
  updateAndPostGroceryList: (updatedGroceryList: GroceryItem[]) => void,
  multiplier?: number
}

function GroceryList({
  groceryList,
  updateAndPostGroceryList,
  multiplier = 1,
}: GroceryListProps) {
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
      <ul className={classes.groceryul}>
        {groceryList.map((ingredient, idx) => (
          <Row
            className={classes.listRow}
            style={{ backgroundColor: idx % 2 === 0 ? '#F2F9FF' : 'white' }}
            key={ingredient.name}
          >
            <Checkbox
              checked={ingredient.checked}
              onChange={(e) => handleChecked(e, idx)}
              className={classes.listCheckbox}
            >
              {(ingredient.amount * multiplier).toFixed(1)}
            </Checkbox>
            <Select
              value={ingredient.amountType}
              className={classes.listSelect}
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

GroceryList.defaultProps = { multiplier: 1 };

export default GroceryList;
