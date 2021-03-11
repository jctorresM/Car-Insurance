// Default rule values
const defaultRule = {
  incrementFactor: -1,
  minPrice: 0,
  maxPrice: 50,
  factorAfterDueDate: -2,
}

// Class for product "Rule"
class Rule {
  constructor(params) {
    const values = { ...defaultRule, ...params };

    this.incrementFactor = values.incrementFactor;
    this.minPrice = values.minPrice;
    this.maxPrice = values.maxPrice;
    this.factorAfterDueDate = values.factorAfterDueDate;
    this.constantPrice = values.constantPrice;
    this.ruleProvider = values.ruleProvider;
  }

  calculateUpdatedPrice(sellIn, price) {
    // execute custom rule provider if found
    if (this.ruleProvider)
      return this.ruleProvider(sellIn, price, this);

    // if rule has constant price just return it back
    if (this.constantPrice >= 0)
      return this.constantPrice;

    // if price is at lower limit and negative factor, don't do anything and return
    if (price === this.minPrice && this.incrementFactor < 0)
      return this.minPrice;

    // if price is at higher limit and positive factor, don't do anything and return
    if (price === this.maxPrice && this.incrementFactor >= 0)
      return this.maxPrice;

    // calculate price 
    let calculatedPrice = 0;
    
    if (sellIn >= 0)
      calculatedPrice = price + this.incrementFactor;
    else
      calculatedPrice = price + this.factorAfterDueDate;

    if (calculatedPrice < this.minPrice) return this.minPrice;

    if (calculatedPrice > this.maxPrice) return this.maxPrice;

    return calculatedPrice;
  }
}

module.exports = Rule;