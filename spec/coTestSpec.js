const expect = require('chai').expect;

const coTest = require('../src/coTest');
const CarInsurance = coTest.CarInsurance;
const Product = coTest.Product;

describe("Default product rule for Low and Medium Coverage (decrement)", function () {

  it("Should decrement by 1 unit before due day", function () {
    const sellIn = 10;
    const price = 20;
    const expectedPrice= 19;
    const coTest = new CarInsurance([
      new Product("Default Coverage", sellIn, price),
      new Product("Low Coverage", sellIn, price),
      new Product("Medium Coverage", sellIn, price)
    ]);
    const products = coTest.updatePrice();
    expect(products.every(p => p.price === expectedPrice)).to.equal(true);
  });

  it("Should decrement by 2 units after due day", function () {
    const sellIn = -1;
    const price = 8;
    const expectedPrice = 6;
    const coTest = new CarInsurance([
      new Product("Low Coverage", sellIn, price),
      new Product("Medium Coverage", sellIn, price)
    ]);
    const products = coTest.updatePrice();
    expect(products.every(p => p.price === expectedPrice)).to.equal(true);
  });

  it("Should not decrease bellow 0", function () {
    const sellIn = -1;
    const price = 0;
    const expectedPrice = 0;
    const coTest = new CarInsurance([
      new Product("Low Coverage", sellIn, price),
      new Product("Medium Coverage", sellIn, price)
    ]);
    const products = coTest.updatePrice();
    expect(products.every(p => p.price === expectedPrice)).to.equal(true);
  });

});

describe("Default product rule for Full Coverage (increase)", function () {

  it("Should increase by 1 unit before due day", function () {
    const sellIn = 10;
    const price = 20;
    const expectedPrice = 21;
    const coTest = new CarInsurance([new Product("Full Coverage", sellIn, price)]);
    const products = coTest.updatePrice();
    expect(products[0].price).to.equal(expectedPrice);
  });

  it("Should increase by 2 units after due day", function () {
    const sellIn = -1;
    const price = 8;
    const expectedPrice = 10;
    const coTest = new CarInsurance([new Product("Full Coverage", sellIn, price)]);
    const products = coTest.updatePrice();
    expect(products[0].price).to.equal(expectedPrice);
  });

  it("Should not increase above 50 units in price", function () {
    const sellIn = -1;
    const price = 49;
    const expectedPrice = 50;
    const coTest = new CarInsurance([
      new Product("Full Coverage", sellIn, price),
      new Product("Full Coverage", sellIn, 50)
    ]);
    const products = coTest.updatePrice();
    expect(products[0].price).to.equal(expectedPrice);
  });

});

describe("Product rule for Mega Coverage (constant price)", function () {

  it("Should keep a constant price of 80", function () {
    const price = 80;
    const coTest = new CarInsurance([
      new Product("Mega Coverage", 5, price),
      new Product("Mega Coverage", -5, price),
      new Product("Mega Coverage", 0, price)
    ]);
    const products = coTest.updatePrice();
    expect(products.every(p => p.price === price)).to.equal(true);
  });

});

describe("Product rule for Super Sale (decrement twice as fast)", function () {

  it("Should decrement by 2 unit before due day", function () {
    const sellIn = 10;
    const price = 20;
    const expectedPrice = 18;
    const coTest = new CarInsurance([new Product("Super Sale", sellIn, price)]);
    const products = coTest.updatePrice();
    expect(products.every(p => p.price === expectedPrice)).to.equal(true);
  });

  it("Should decrement by 4 units after due day", function () {
    const sellIn = -1;
    const price = 8;
    const expectedPrice = 4;
    const coTest = new CarInsurance([new Product("Super Sale", sellIn, price)]);
    const products = coTest.updatePrice();
    expect(products.every(p => p.price === expectedPrice)).to.equal(true);
  });

  it("Should not decrease bellow 0", function () {
    const sellIn = -1;
    const price = 2;
    const expectedPrice = 0;
    const coTest = new CarInsurance([new Product("Super Sale", sellIn, price)]);
    const products = coTest.updatePrice();
    expect(products.every(p => p.price === expectedPrice)).to.equal(true);
  });

});

describe("Product rule for Special Full Coverage (custom rule provider)", function () {

  it("Should increase by 1 unit when there are more than 10 days before due day", function () {
    const sellIn = 11;
    const price = 20;
    const expectedPrice = 21;
    const coTest = new CarInsurance([new Product("Special Full Coverage", sellIn, price)]);
    const products = coTest.updatePrice();
    expect(products[0].price).to.equal(expectedPrice);
  });

  it("Should increase by 2 units when there are 10 days or less before due day", function () {
    const sellIn = 9;
    const price = 20;
    const expectedPrice = 22;
    const coTest = new CarInsurance([new Product("Special Full Coverage", sellIn, price)]);
    const products = coTest.updatePrice();
    expect(products[0].price).to.equal(expectedPrice);
  });

  it("Should increase by 3 units when there are 5 days or less before due day", function () {
    const sellIn = 4;
    const price = 20;
    const expectedPrice = 23;
    const coTest = new CarInsurance([new Product("Special Full Coverage", sellIn, price)]);
    const products = coTest.updatePrice();
    expect(products[0].price).to.equal(expectedPrice);
  });

  it("Should set price equal to 0 after due date", function () {
    const sellIn = -1;
    const price = 20;
    const expectedPrice = 0;
    const coTest = new CarInsurance([new Product("Special Full Coverage", sellIn, price)]);
    const products = coTest.updatePrice();
    expect(products[0].price).to.equal(expectedPrice);
  });

  it("Should not increase above 50 units in price", function () {
    const expectedPrice = 50;
    const coTest = new CarInsurance([
      new Product("Special Full Coverage", 2, 49),
      new Product("Special Full Coverage", 8, 49),
      new Product("Special Full Coverage", 15, 50),
      new Product("Special Full Coverage", 10, 49),
      new Product("Special Full Coverage", 10, 50),
      new Product("Special Full Coverage", 5, 49)
    ]);
    const products = coTest.updatePrice();
    expect(products.every(p => p.price === expectedPrice)).to.equal(true);
  });


});
