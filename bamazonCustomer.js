/*
5. create a Node application called `bamazonCustomer.js`. Running this application will first display 
all of the items available for sale. Include the ids, names, and prices of products for sale.
6. The app should then prompt users with two messages.
    * The first should ask them the ID of the product they would like to buy.
    * The second message should ask how many units of the product they would like to buy.
7. Once the customer has placed the order, your application should check if your store has enough of the product 
to meet the customer's request.
    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
    * This means updating the SQL database to reflect the remaining quantity.
    * Once the update goes through, show the customer the total cost of their purchase.
*/
var mysql = require('mysql');
// Load the NPM Package inquirer
var inquirer = require("inquirer");
var Table = require("cli-table");
// mysql -u root -p
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'bamazon_db',
    port: 3306
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
});
var displayProducts = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        var displayTable = new Table({
            head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
            colWidths: [10, 25, 25, 10, 14]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(displayTable.toString());
        purchasePrompt();
    });
}
function purchasePrompt() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Please enter the Item ID of the product you'd like to buy",
            filter: Number
        },
        {
            name: "Quantity",
            type: "input",
            message: "How many units of this product would you like to buy?",
            filter: Number
        },

    ]).then(function (answers) {
        var quantityNeeded = answers.Quantity;
        var IDrequested = answers.ID;
        purchaseOrder(IDrequested, quantityNeeded);
    });
};
function purchaseOrder(ID, amtNeeded) {
    connection.query('Select * FROM products WHERE item_id = ' + ID, function (err, res) {
        if (err) { console.log(err) };
        if (amtNeeded <= res[0].stock_quantity) {
            var totalCost = res[0].price * amtNeeded;
            console.log("Your total cost for " + amtNeeded + " " + res[0].product_name + " is " + totalCost + " Thank you!");
            var stUpdate = res[0].stock_quantity - amtNeeded;
            console.log (stUpdate);
            connection.query("UPDATE products SET stock_quantity = " + stUpdate + "WHERE item_id = " + ID);
        } else {
            console.log("Insufficient quantity!");
        };
        displayProducts();
    });
};
displayProducts(); 