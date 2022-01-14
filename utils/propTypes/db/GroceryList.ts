import { AmountType } from '..';

interface GroceryItem {
  amount: number,
  amountType: AmountType,
  checked: boolean,
  name: string
}

export default GroceryItem;
