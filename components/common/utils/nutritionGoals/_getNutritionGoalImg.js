const GoalImgMap = {
  'fruit': 'https://cdn-icons-png.flaticon.com/512/1155/1155340.png',
  'nuts': 'https://cdn-icons-png.flaticon.com/512/1155/1155347.png',
  'protein': 'https://cdn-icons-png.flaticon.com/512/1155/1155301.png',
  'carbs': 'https://cdn-icons-png.flaticon.com/512/1155/1155301.png',
  'fat': 'https://cdn-icons-png.flaticon.com/512/1155/1155301.png',
  'calories': 'https://cdn-icons-png.flaticon.com/512/1155/1155301.png',
  'proteinType': 'https://cdn-icons.flaticon.com/png/512/831/premium/831945.png?token=exp=1639261648~hmac=ef9d21b970d1d8328c1dba77f9bf72ee'
}

const GetNutritionGoalImg = (goal) => GoalImgMap[goal];

export default GetNutritionGoalImg;