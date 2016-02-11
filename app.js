var storage = require("node-persist");
storage.initSync();

var argv = require("yargs")
    .command("create", "Create a new account", function(yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: "Accout name (e.g: Twitter)",
                type: "string"
            },
            username: {
                demand: true,
                alias: 'u',
                description: "youremail@example.com",
                type: "string"
            },
            password: {
                demand: true,
                alias: 'p',
                description: "qwf123",
                type: "string"
            }
        }).help("help");
    })
    .command("get", "Get an existing account", function(yargs){
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: "Accout name (e.g: Twitter)",
                type: "string"
            }
        }).help("help");
    })
    .help("help")
    .argv;
var command = argv._[0];
// create
//   --name
//   -- username
//   password

// get
//   --name

// account.name
// account.username
// account.password

function createAccount(account) {
    var accounts = storage.getItemSync("accounts");
    if (typeof accounts === "undefined"){
        accounts = [];
    }
    accounts.push(account);
    storage.setItemSync("accounts", accounts);
    return account
}

function getAccount(accountName) {
    var accounts = storage.getItemSync("accounts");
    var foundUser;
    accounts.forEach(function(account){        
        if(account.name === accountName) {
            foundUser = account;
        }
    });
    console.log(foundUser);
    return foundUser;
}

if (command === "create") {
    var createdAccount = createAccount({
        name: argv.name,
        username: argv.username,
        password: argv.password        
    });
    console.log("Account Created!");
    console.log(createdAccount);
} else if (command === "get") {
    var foundAccount = getAccount(argv.name);        
    if (typeof foundAccount === 'undefined') {
        console.log("Account Not Found");
    } else {
        console.log("Account Found!");
        console.log(foundAccount);
    }
}


