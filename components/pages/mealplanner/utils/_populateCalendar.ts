import type { MealEventResponse } from 'utils/propTypes/requests';
import type { Calendar } from '../types';

export const CalendarDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const CalendarSkeleton = (startDate: Date) => {
  const calendar: Calendar = [];

  for (let i = 0; i < 7; i += 1) {
    const date = new Date();
    date.setDate(startDate.getDate() + i);

    calendar.push({
      id: date.toDateString(),
      date,
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
    const {
      Date, MealTime, id, Recipe, Servings,
    } = mealEvent;

    const dateIdx = Date.getDay();
    const calendarIdx = Math.abs(
      dateIdx + (CalendarDays.length - startDate.getDay()),
    ) % CalendarDays.length;

    calendar[calendarIdx]
      .meals[MealTime]
      .push({
        id,
        RecipeInfo: Recipe,
        Servings,
      });
  });

  return calendar;
};

export default PopulateCalendar;
