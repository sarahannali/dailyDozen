import { Recipe, UserRecipe } from '../../../../utils/propTypes';

const addUserRecipeData = (
  recipes: Recipe[],
  userRecipes: UserRecipe[],
) => recipes.map((recipe) => {
  const userRecipe = userRecipes.filter((u) => u.RecipeID === recipe.id)[0];

  if (userRecipe) {
    return {
      ...recipe,
      Favorite: userRecipe.Favorite,
      Rating: userRecipe.Rating,
      userRecipeID: userRecipe.id,
    };
  }
  return recipe;
});

export default addUserRecipeData;
