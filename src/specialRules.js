const specialFullCoverageProvider = (sellIn, price, rule) => {
  // parameters
  const [firstIncrement, secondIncrement] = [
    { days: 10, factor: 2 },
    { days: 5, factor: 3 }
  ];

  let calculatedPrice = 0;

  if (sellIn < 0)
    return calculatedPrice;

  // if price is at upper limit don't do anything and return
  if (price === rule.maxPrice)
    return price;

  // if sellIn is greater than first increment
  if (sellIn >= firstIncrement.days)
    calculatedPrice = price + rule.incrementFactor;

  // less than first increment days
  if (sellIn < firstIncrement.days && sellIn >= secondIncrement.days)
    calculatedPrice = price + firstIncrement.factor;

  // less than second increment days
  if (sellIn < secondIncrement.days && sellIn >= 0)
    calculatedPrice = price + secondIncrement.factor;

  return calculatedPrice > rule.maxPrice ? rule.maxPrice : calculatedPrice;
}

module.exports = { specialFullCoverageProvider }