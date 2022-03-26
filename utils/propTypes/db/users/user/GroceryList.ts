import { AmountType } from '../../ingredients/Ingredient';

interface GroceryItem {
  amount: number,
  amountType: AmountType,
  checked: boolean,
  name: string,
  ratio: number
}

export default GroceryItem;
