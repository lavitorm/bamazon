# bamazon
Interactive shopping app that uses `MySQL` and `Node.js`.
Allows users to purchase items as customers at the "portal".

MySQL Database called `bamazon.sql` holds product information inside the table called "products":

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

Node.js app called `bamazonCustomer.js` first displays all of the items available for sale (including the ids, names, and prices of products for sale).

The app then prompts users with two messages:

   * The first message asks them the ID of the product they would like to buy.
   * The second asks how many units of the product they would like to buy.

Once the customer has placed the order, the app checks if the store has enough of the product to meet the customer's request.

   * If not, the app logs the phrase "Insufficient quantity!", and then prevents the order from going through.

When the store _does_ have enough of the product, the app fulfills the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, it shows the customer the total cost of his/her purchase.
