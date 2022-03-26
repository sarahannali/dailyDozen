import { MealEventRecipe, MealEventResponse } from 'utils/propTypes/requests';

export const CalendarDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export type Meal = {
  id?: string,
  RecipeInfo: MealEventRecipe,
  Servings: number
}

export type Meals = {
  Breakfast: Meal[],
  Lunch: Meal[],
  Dinner: Meal[]
}

type CalendarDate = {
  id: string,
  date: Date,
  meals: Meals
}

export type Calendar = CalendarDate[];

const CalendarSkeleton = (startDate: Date) => {
  const calendar: Calendar = [];

  for (let i = 0; i < 7; i += 1) {
    const currDate = new Date();
    currDate.setDate(startDate.getDate() + i);

    calendar.push({
      id: currDate.toDateString(),
      date: currDate,
      meals: {
        Breakfast: [],
        Lunch: [],
        Dinner: [],
      },
    });
  }

  return calendar;
};

const PopulateCalendar = (mealEvents: MealEventResponse[], startDate: Date) => {
  startDate.setHours(0, 0, 0, 0);
  const calendar = CalendarSkeleton(startDate);

  mealEvents.forEach((mealEvent) => {
    const dateIdx = new Date(mealEvent.Date).getDay();
    const calendarIdx = Math.abs(
      dateIdx + (CalendarDays.length - startDate.getDay()),
    ) % CalendarDays.length;

    calendar[calendarIdx]
      .meals[mealEvent.MealTime]
      .push({
        id: mealEvent.id,
        RecipeInfo: mealEvent.Recipe,
        Servings: mealEvent.Servings,
      });
  });

  return calendar;
};

export default PopulateCalendar;
