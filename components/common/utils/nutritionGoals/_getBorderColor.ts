const ColorMap = {
  beans: '#f79292',
  berries: '#f7c78d',
  cruciferous: '#faf1ac',
  flaxseed: '#a1e3a4',
  fruit: '#9beaf2',
  grains: '#a0c4ff',
  greens: '#bdb2ff',
  nuts: '#ffc6ff',
  vegetables: '#fca9d4',
};

const GetBorderColor = (goal: string) => ColorMap[goal];

export default GetBorderColor;
