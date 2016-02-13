var storage = require("node-persist");
storage.initSync();

var crypto = require('crypto-js');
var argv = require("yargs")
        .command("create", "Create a new account", function(yargs) {
            yargs.options({
                name: {
                    demand: true,
                    alias: 'n',
                    description: "Account name (e.g: Twitter)",
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
                },
                masterPassword: {
                    demand: true,
                    alias: 'm',
                    description: "qwf123",
                    type: "string"
                }
            }).help("help");
        })
        .command("get", "Get an existing account", function(yargs) {
            yargs.options({
                name: {
                    demand: true,
                    alias: 'n',
                    description: "Account name (e.g: Twitter)",
                    type: "string"
                },
                masterPassword: {
                    demand: true,
                    alias: 'm',
                    description: "qwf123",
                    type: "string"
                }
            }).help("help");
        })
        .help("help")
        .argv;
var command = argv._[0];

function getAccounts (masterPassword) {
    var encryptedAccount = storage.getItemSync("accounts");
    var accounts = [];
    if (typeof encryptedAccount !== "undefined") {
        var bytes = crypto.AES.decrypt(encryptedAccount, masterPassword);
        accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
    }
    return accounts;
}


function saveAccounts (accounts, masterPassword) {
    var encryptedAccounts = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
    storage.setItemSync("accounts", encryptedAccounts.toString());
    return accounts;
}

function createAccount(account, masterPassword) {
    var accounts = getAccounts(masterPassword);
    accounts.push(account);
    saveAccounts(accounts, masterPassword);
    return account;
}

function getAccount(accountName, masterPassword) {
    var accounts = getAccounts(masterPassword);
    var foundUser;
    accounts.forEach(function(account) {
        if(account.name === accountName) {
            foundUser = account;
        }
    });
    console.log(foundUser);
    return foundUser;
}

if (command === "create") {
    try {
        var createdAccount = createAccount({
            name: argv.name,
            username: argv.username,
            password: argv.password
        }, argv.masterPassword);
        console.log("Account Created!");
        console.log(createdAccount);
    } catch (e) {
        console.log("Not able to create account");
    }
} else if (command === "get") {
    try {
        var foundAccount = getAccount(argv.name, argv.masterPassword);
        if (typeof foundAccount === 'undefined') {
            console.log("Account Not Found");
        } else {
            console.log("Account Found!");
            console.log(foundAccount);
        }
    } catch (e) {
        console.log("Not able to get account");
    }
}


