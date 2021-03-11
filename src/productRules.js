const { specialFullCoverageProvider } = require('./specialRules');

// Define the price rules of the products here (if rule is empty, then the default rule will be used)
const productRules = [
  {
    productName: 'Low Coverage'
  },
  {
    productName: 'Medium Coverage'
  },
  {
    productName: 'Full Coverage',
    rule: {
      incrementFactor: 1,
      factorAfterDueDate: 2
    }
  },
  {
    productName: 'Mega Coverage',
    rule: {
      constantPrice: 80
    }
  },
  {
    productName: 'Special Full Coverage',
    rule: {
      incrementFactor: 1,
      ruleProvider: specialFullCoverageProvider
    },
  },
  {
    productName: 'Super Sale',
    rule: {
      incrementFactor: -2,
      factorAfterDueDate: -4
    }
  }
];

module.exports = { productRules };