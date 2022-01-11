type Ingredient = {
  name: string,
  ratio: number,
  types: Array<string>
}

export type AmountType = 'cup' | 'tbs' | 'tsp' | 'gal'

export default Ingredient;
