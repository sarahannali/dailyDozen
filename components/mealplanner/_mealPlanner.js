export const reorderMeals =
  (source, destination, recipes, days) => {
    let removed;
    const daysClone = Array.from(days);

    if (source.droppableId == 'Recipes') {
      removed = recipes[source.index];
    } else {
      const sourceCodes = source.droppableId.split(':');

      [removed] = daysClone
          .find((d) => d.id === sourceCodes[0])
          .meals
          .find((m) => m.id == sourceCodes[1])
          .recipes
          .splice(source.index, 1);
    }

    const destCodes = destination.droppableId.split(':');

    daysClone
        .find((d) => d.id === destCodes[0])
        .meals
        .find((m) => m.id == destCodes[1])
        .recipes
        .splice(destination.index, 0, removed);

    return daysClone;
  };

export const getColor = (mealTime) => {
  switch (mealTime) {
    case 'breakfast':
      return '#A8DBE9';
    case 'lunch':
      return '#FF9999';
    case 'dinner':
      return '#FDD09B';
    default:
      return '#fff'
  }
};

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

export const PopulatedCalendarSkeleton = (allRecipeData, currentWeekMealEvents) => {
  var calendar = CalendarSkeleton();

  currentWeekMealEvents.forEach((mealEvent) => {
    mealEvent.recipe = allRecipeData.find(el => el.id == mealEvent.recipeID);
    var calendarIdx = new Date(mealEvent.date * 1000).getDay();
    
    calendar[calendarIdx].meals[mealEvent.mealTime].recipes.push(mealEvent.recipe);
  })

  return calendar;
}

export const GetIngredients = (days) => {
  const ingredients = [];

  days.forEach(day => {
    day.meals.forEach(meal => {
      meal.recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
          console.log("RECIPE: ");
          console.log(recipe)
          console.log("DAY ");
          console.log(day)
          const existingIngredient = ingredients.find(ingr => ingr.name == ingredient.name);
          console.log("EXISTING: " + existingIngredient)
          console.log(existingIngredient)
          if (existingIngredient != undefined) {
            existingIngredient.amount += ingredient.amount;
          }
          else ingredients.push(ingredient);
        })
      })
    })
  })

  return ingredients;
}