import { AmountType } from 'utils/propTypes/db';

const typesInCups = (ratio: number) => ({
  gal: 16,
  cup: 1,
  tbs: 0.0625,
  tsp: (1 / 48),
  g: (1 / ratio),
});

export const ConvertAmount = (
  amount: number,
  orgType: AmountType,
  newType: AmountType,
  ratio: number,
) => {
  const typesMultiplier = typesInCups(ratio);
  const amountInCups = amount * typesMultiplier[orgType];

  return amountInCups * (1 / typesMultiplier[newType]);
};

export default ConvertAmount;
