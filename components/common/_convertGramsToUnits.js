const ConvertGramsToUnits = (amountInGrams, ratio) => {
  const amountInCups = amountInGrams / ratio;
  let amount = amountInCups;
  let amountType = "cup"
  
  if (amountInCups < .25) {
    amount = amountInCups * 16;
    amountType = "tbs";

    if (amount < .3) {
      amount = amount * 3;
      amountType = "tsp";
    }
  } else if (amountInCups > 16) {
    amount = amountInCups / 16;
    amountType = "gal"
  }

  return [amount, amountType];
};

export default ConvertGramsToUnits;