const MealMap = {
  'Breakfast': '#A8DBE9',
  'Lunch': '#FF9999',
  'Dinner': '#FDD09B'
}

const GetColor = (mealTime) => MealMap[mealTime];

export default GetColor;