const typesInCups = {
  "gal": 16,
  "cup": 1,
  "tbs": 0.0625,
  "tsp": (1/48)
};

export const ConvertAmount = (amount, orgType, newType) => {
  const amountInCups = amount * typesInCups[orgType];

  return amountInCups * (1 / typesInCups[newType]);
};

export default ConvertAmount;
