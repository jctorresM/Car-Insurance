const Rule = require('./rule');
const { productRules } = require('./productRules');

class Product {
  constructor(name, sellIn, price) {
    this.name = name;
    this.sellIn = sellIn;
    this.price = price;
  }
}

class CarInsurance {
  constructor(products = []) {
    this.products = products;
  }
  updatePrice() {
    this.products.forEach((product) => {
      // find the rule by name
      const productRule = productRules.find(p => p.productName === product.name);

      // assign rule to product and fallback to default if product is not found
      let rule;

      if (productRule) {
        rule = new Rule(productRule.rule);
      } else {
        rule = new Rule();
      }
        

      // execute price function of rule
      product.sellIn -= 1;
      product.price = rule.calculateUpdatedPrice(product.sellIn, product.price);
    });

    return this.products;
  }
}

module.exports = {
  Product,
  CarInsurance
}
