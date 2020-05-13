var mysql = require ("mysql");
var inquirer = require ("inquirer");
var table = require ("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password:"admin",
    database: "bamazon"
});

connection.connect(function(err){
    if(err)throw err;
    console.log("connected as id"+ connection.threadId);

});

var displayProducts = function(){
    var query = "SELECT *FROM products";
    connection.query(query,function(err,res){
        if (err) throw err;
        var displayTable = new table({
            head: ["Item Id", "Product Name","Department", "Price","Quantity"],
        });
    });

    for(var i = 0; i < res.length; i ++){
        displayTable.push(
            [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
        );
    }
    console.log(displayTable.toString());
    purchasePrompt();

}
    function purchasePrompt(){
        inquirer.prompt([
        {
            name: "Id",
            type: "input",
            message: "Please enter the item Id you like to purchase.",
            filter: Number
        },
        {
            name: "Quantity",
            type: "input",
            message: "How many items do you want to purchase?",
            filter: Number
        },

        ]).then(function(answers){
            var quantityNeeded = answers.Quantity;
            var Idrequested = answers.Id;
            purchaseOrder(Idrequested,quantityNeeded);
        });
    };

    function purchaseOrder(Id, amountNeeded){
        connection.query("SELECT * FROM products WHERE item_id =" + Id, function(err,res){
            if(err){console.log(err)};
            if(amountNeeded <= res[0].stock_quantity){
                var ttotalCost = res[0].price * amountNeeded;
                console.log("Good news, your order is in stock!");
                console.log("Your total cost for" +amountNeeded + "" +res[0].product_name + "is"+totalCost + "Thank you!");

                connection.query("UPDATE products SET stock_quantity -" + amountNeeded + "WHERE item_id =" + Id);
            } else{
                console.log("insufficient quantity, sorry we do not have enough" + res[0].product_name + "to complete your order.");

            };
            displayProducts();
        });
    };
    displayProducts();