export const CalendarDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

const Meals = [
  "Breakfast",
  "Lunch",
  "Dinner"
]

const CalendarSkeleton = (startDate) => {
  const calendar = [];

  for (let i = 0; i < 7; i++) {
    var currDate = new Date();
    currDate.setDate(startDate.getDate() + i);

    calendar.push({
      id: currDate.toDateString(),
      date: currDate,
      meals: {
        [Meals[0]]: [],
        [Meals[1]]: [],
        [Meals[2]]: []
      }
    })
  }

  return calendar;
}

const PopulateCalendar = (mealEvents, startDate) => {
  startDate.setHours(0, 0, 0, 0);
  var calendar = CalendarSkeleton(startDate);

  mealEvents.forEach((mealEvent) => {
    const dateIdx = new Date(mealEvent.Date).getDay()
    var calendarIdx = Math.abs(dateIdx + (CalendarDays.length - startDate.getDay())) % CalendarDays.length;
    
    calendar[calendarIdx].meals[mealEvent.MealTime].push({id: mealEvent.id, RecipeInfo: mealEvent.Recipe, Servings: mealEvent.Servings});
  })

  return calendar;
};

export default PopulateCalendar;