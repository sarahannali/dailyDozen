import { AmountType } from '../../../../../utils/propTypes';

const typesInCups = {
  gal: 16,
  cup: 1,
  tbs: 0.0625,
  tsp: (1 / 48),
  g: 1,
};

export const ConvertAmount = (amount: number, orgType: AmountType, newType: AmountType) => {
  const amountInCups = amount * typesInCups[orgType];

  return amountInCups * (1 / typesInCups[newType]);
};

export default ConvertAmount;
