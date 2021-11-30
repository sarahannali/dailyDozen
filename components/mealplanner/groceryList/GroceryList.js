import React from 'react';
import { GetGroceryList } from './utils/index';

const GroceryList = ({days, allIngredientData}) => {
  const groceryList = GetGroceryList(days, allIngredientData);

  return (
    <div>
      <ul>
      {groceryList.map(ingredient => {
        console.log(ingredient)
        return (<li>
          {ingredient.amount} {ingredient.name}
        </li>)
      })}
      </ul>
    </div>
  );
};

export default GroceryList;
