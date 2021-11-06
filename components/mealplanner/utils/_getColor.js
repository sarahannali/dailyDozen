const GetColor = (mealTime) => {
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

export default GetColor;