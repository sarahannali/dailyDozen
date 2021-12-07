const getRequestObj = (movedObj, strCodes) => {
  const codes = strCodes.split(':');
  
  return {
    id: movedObj.id,
    Date: codes[0],
    MealTime: codes[1],
    RecipeInfo: movedObj.RecipeInfo,
    Servings: movedObj.Servings
  }
};

export default getRequestObj;
