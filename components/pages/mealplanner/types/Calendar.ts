import type { Meals } from './Meals';

type CalendarDate = {
  id: string,
  date: Date,
  meals: Meals
}

type Calendar = CalendarDate[];

export default Calendar;
