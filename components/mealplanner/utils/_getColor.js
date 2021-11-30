const MealMap = {
  'breakfast': '#A8DBE9',
  'lunch': '#FF9999',
  'dinner': '#FDD09B'
}

const GetColor = (mealTime) => MealMap[mealTime];

export default GetColor;