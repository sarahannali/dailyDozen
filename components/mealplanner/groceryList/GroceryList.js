import React from 'react';
import { GetGroceryList } from './_groceryList';

const GroceryList = ({days, allIngredientData}) => {
  const groceryList = GetGroceryList(days, allIngredientData);

  return (
    <div>
      <ol>
      {groceryList.map(ingredient => {
        console.log(ingredient)
        return (<ol>
          {ingredient.amount} {ingredient.name}
        </ol>)
      })}
      </ol>
    </div>
  );
};

export default GroceryList;
