export type Type =
  'beans' |
  'berries' |
  'calories' |
  'carbs' |
  'cruciferous' |
  'fat' |
  'flaxseed' |
  'fruit' |
  'grains' |
  'greens' |
  'nuts' |
  'protein' |
  'vegetables'

export type AmountType = 'cup' | 'tbs' | 'tsp' | 'gal'

type Ingredient = {
  name: string,
  ratio: number,
  types: Array<Type>
}

export default Ingredient;
