import { AmountType } from '../../ingredients/Ingredient';

type GroceryItem = {
  amount: number,
  amountType: AmountType,
  checked: boolean,
  name: string,
  ratio: number
}

export default GroceryItem;
