import { Meals } from '../../../../utils/_populateCalendar';

const MealMap = {
  Breakfast: '#A8DBE9',
  Lunch: '#FF9999',
  Dinner: '#FDD09B',
};

const GetColor = (mealTime: keyof Meals) => MealMap[mealTime];

export default GetColor;
