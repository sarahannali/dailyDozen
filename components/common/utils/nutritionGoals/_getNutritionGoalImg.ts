const GoalImgMap = {
  beans: 'https://cdn-icons-png.flaticon.com/512/687/687133.png',
  berries: 'https://cdn-icons-png.flaticon.com/512/3313/3313759.png',
  cruciferous: 'https://cdn-icons-png.flaticon.com/512/1038/1038705.png',
  flaxseed: 'https://cdn-icons-png.flaticon.com/512/2919/2919843.png',
  fruit: 'https://cdn-icons-png.flaticon.com/512/1155/1155340.png',
  grains: 'https://cdn-icons-png.flaticon.com/512/2538/2538767.png',
  greens: 'https://cdn-icons-png.flaticon.com/512/3373/3373113.png',
  nuts: 'https://cdn-icons-png.flaticon.com/512/1155/1155347.png',
  vegetables: 'https://cdn-icons-png.flaticon.com/512/2583/2583634.png',
};

const GetNutritionGoalImg = (goal: string) => GoalImgMap[goal];

export default GetNutritionGoalImg;
