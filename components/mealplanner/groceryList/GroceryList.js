import React from 'react';

const GroceryList = ({ingredients}) => {
  return (
    <div>
      <ol>
      {ingredients.map(ingredient => {
        console.log(ingredient)
        return (<li>
          {ingredient.amount} {ingredient.name}
        </li>)
      })}
      </ol>
    </div>
  );
};

export default GroceryList;
