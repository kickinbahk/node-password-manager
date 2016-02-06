var storage = require("node-persist");
storage.initSync();

// storage.setItemSync("name", "Josiah");

console.log("Starting Password Manager");

// storage.setItemSync("accounts", [{
//     username: "Fred", 
//     balance: 30
// }]);

var accounts = storage.getItemSync("accounts");

// accounts.push({
//     username: "Sandy",
//     balance: 100
// });

storage.setItemSync("accounts", accounts);
console.log(accounts);
