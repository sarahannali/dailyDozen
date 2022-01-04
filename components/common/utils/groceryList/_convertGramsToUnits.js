const ConvertGramsToUnits = (amountInGrams, ratio, givenAmountType = null) => {
  const amountInCups = amountInGrams / ratio;
  let amount = amountInCups;
  let amountType = givenAmountType || "cup";
  
  if (!givenAmountType) {
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
  }
  else {
    if (amountType == "tbs") amount = amountInCups * 16;
    else if (amountType == "tsp") amount = amountInCups * 16 * 3;
    else if (amountType == "gal") amount = amountInCups / 16;
  }

  return [amount, amountType];
};

export default ConvertGramsToUnits;