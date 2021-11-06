



const CalendarDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
]

const Meals = [
  "breakfast",
  "lunch",
  "dinner"
]

const CalendarSkeleton = () => {
  return CalendarDays.map(day => {
    return {
      id: day,
      date: '2021-10-10',
      meals: Meals.map(meal => {
        return {
          id: meal,
          recipes: []
        }
      })
    }
  })
}

const PopulatedCalendar = (allRecipeData, currentWeekMealEvents) => {
  var calendar = CalendarSkeleton();

  currentWeekMealEvents.forEach((mealEvent) => {
    mealEvent.recipe = allRecipeData.find(el => el.id == mealEvent.recipeID);
    var calendarIdx = new Date(mealEvent.date * 1000).getDay();
    
    calendar[calendarIdx].meals[mealEvent.mealTime].recipes.push(mealEvent.recipe);
  })

  return calendar;
};

export default PopulatedCalendar;