export type Type =
  'beans' |
  'berries' |
  'cruciferous' |
  'flaxseed' |
  'fruit' |
  'grains' |
  'greens' |
  'nuts' |
  'vegetables'

export type AmountType = 'cup' | 'tbs' | 'tsp' | 'gal' | 'g'

type Ingredient = {
  name: string,
  ratio: number,
  types: Type[]
}

export default Ingredient;
