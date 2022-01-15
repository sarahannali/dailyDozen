import { AmountType } from '../../../../utils/propTypes';

const ConvertGramsToUnits = (
  amountInGrams: number,
  ratio: number,
  givenAmountType = '',
): [number, AmountType] => {
  const amountInCups = amountInGrams / ratio; // todo: rewrite?
  let amount = amountInCups;
  let amountType = givenAmountType || 'cup' || 'g';

  if (!givenAmountType) {
    if (amountInCups < 0.25) {
      amount = amountInCups * 16;
      amountType = 'tbs';

      if (amount < 0.3) {
        amount *= 3;
        amountType = 'tsp';
      }
    } else if (amountInCups > 16) {
      amount = amountInCups / 16;
      amountType = 'gal';
    }
  } else if (amountType === 'tbs') amount = amountInCups * 16;
  else if (amountType === 'tsp') amount = amountInCups * 16 * 3;
  else if (amountType === 'gal') amount = amountInCups / 16;

  return [amount, amountType as AmountType];
};

export default ConvertGramsToUnits;
