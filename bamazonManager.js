var mysql = require("mysql");
var inquirer = require("inquirere");
var table = require ("cli-table");

var connection = mysql.createConnection({
     host: "localhost",
     port: 3306,
     user: "root",
     password: "admin",
     database: "bamazon"
});

connection.connect(function(err){
    if(err)throw err;
    console.log("connected as id"+ connection.threadId);
});

var displayInventory = function(){
    connection.query('SELECT *FROM products', function(err, res){
         if(err){console.log(err)};
         var theDisplayTable = new table({
             head:['Item ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'],
             colWidths: [10,25,25,10,14]
         });

         for(i=0; i<res.length; i++){
             theDisplayTable.push(
                 [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
             );
         }

         console.log(theDisplayTable.toString());
         inquirerForUpdates();
    });
};

function inquirerForUpdates(){
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "Choose an option below to manage inventory.",
        choices: ["Restock Inventory", "Add New Product", "Remove an Existing Product"]
    }]).then(function(answers){
        switch(answers.action){
            case 'Restock Inventory':
                  restockRequest();
                  break;
            case  'Add New Product':
                addRequest();
                break;
            case 'Remove an Existing Product':
                removeRequest();
                break;
        }
    });
};
function restockRequest(){
    inquirer.prompt([
    {
        name: "ID",
        type: "input",
        message: "What is the item number of the item you wuold like to restock?"
    },    
    ]).then(function(answers){
        var quantityAdded = answers.Quantity;
        var IDOfProduct = answers.ID;
        restockInventory(IDOfProduct, quantityAdded);
    });
};
function restockInventory(id, quant){
    connection.query('SELECT * FROM Products WHERE item_id = ' +id, function(err, res){
        if(err){console.log(err)};
        connection.query('UPDATE Products SET stock_quantity +' + stock_quantity + 'WHERE item_id=' +item_id);

        displayInventory();
    });
};
function addRequest(){
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Add ID Number"
        },
        {
            name: "Name",
            type: "input",
            message: "What is the name of the product you would like to stock?"

        },
        {
            name: "Category",
            type: "input",
            message: "What is the category of the product?" 
        },
        {
            name: "Price",
            type: "input",
            message: "What is the price of the item?"
        },
        {
            name: "Quantity",
            type: "input",
            message: "What quantity would you like to add?"
        },
    ]).then(function(answers){
        var id = answers.id;
        var name = answers.Name;
        var category = answers.Category;
        var price = answers.Price;
        var quantity = answers.Quantity;
        buildNewItem(id, name, category, price, quantity);
    });
};
function buildNewItem(name, category, price, quantity){
    connection.query('INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)VALUES ("' 
    + id +'","' + name + '","' + category + '","' + price + ',' + quantity + ')');
};
function removeRequest(){
    inquirer.prompt([{
        name: "ID",
        type: "input",
        message: "what id the id number of the item you would like to remove?"
    }]).then(function(answer){
        var id = answers.ID;
        removeInventory(id);
    });
};
function removeInventory(id){
    connection.query('DELETE FROM Products WHERE item_id =' + id);
    displayInventory();
}
displayInventory();