const Macros = ["calories", "protein", "carbs", "fat"];

const isNotMacro = (goal) => {
  return Macros.findIndex(macro => macro == goal) == -1;
}

export default isNotMacro;