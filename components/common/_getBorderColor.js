const ColorMap = {
  'fruit': '#A2DDBC',
  'nuts': '#FF7C7C',
  'calories': '#E9A8E2',
  'carbs': '#A8DBE9',
  'fat': '#FDD09B',
  'protein': '#FDD09B'
}

const GetBorderColor = (goal) => ColorMap[goal];

export default GetBorderColor;