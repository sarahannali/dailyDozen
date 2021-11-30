const GoalImgMap = {
  'fruit': 'https://cdn-icons-png.flaticon.com/512/1155/1155340.png',
  'nuts': 'https://cdn-icons-png.flaticon.com/512/1155/1155347.png',
  'protein': 'https://cdn-icons-png.flaticon.com/512/1155/1155301.png',
  'carbs': 'https://cdn-icons-png.flaticon.com/512/1155/1155301.png',
  'fat': 'https://cdn-icons-png.flaticon.com/512/1155/1155301.png',
  'calories': 'https://cdn-icons-png.flaticon.com/512/1155/1155301.png'
}

const GetNutritionGoalImg = (goal) => GoalImgMap[goal];

export default GetNutritionGoalImg;