### Description
- Small Node JS app to calculate price of car insurance products following certain rules as described below 
- The app is scalable in the sense that every new product can be added no matter what the other products or rules are (check productRules.js)
- Standard calculations are defined in the **Rule** class inside rule.js
- If there is a special calculation for a Rule (such as the Special Full Coverage), then a rule provider or custom function can be added inside productRules.js

### Commands
- `npm run test`, should run the test suite and display the coverage report
- `npm run after-30-days`, should display an output similar to `products_after_30_days.txt`

### Here you have a description of the products.

- All Products have a `sellIn` value which denotes the number of days we have to sell the product.
- All Products have a `price` value which denotes how much the product cost.
- At the end of each day our system lowers both values for every product.

Pretty simple, right? Well this is where it gets interesting:

- Once the sell by date has passed, `price` degrades twice as fast.
- The `price` of a product is never negative.
- **"Full Coverage"** actually increases in `price` the older it gets.
- The `price` of a product is never more than 50.
- **"Mega Coverage"**, being a legendary product, never has to be sold or decreases in `price`.
- **"Special Full Coverage"**, like full coverage, increases in `price` as its `sellIn` value approaches:
	- `price` increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but.
	- `price` drops to 0 when no more days left (and the product is not valid anymore).

- **"Super Sale"** Products degrade in `price` twice as fast as normal Products.

- A product can never have its `price` increase above 50, however **"Mega Coverage"** is a
legendary product and as such its `price` is 80 and it never alters.
