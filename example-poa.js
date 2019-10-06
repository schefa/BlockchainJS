const Blockchain = require('./src/Blockchain.js');
const Transaction = require('./src/Transaction.js');
const Participants = require('./src/Participants.js');
  
repeat_lines = 50;

console.log("-".repeat(repeat_lines))
console.log("New Blockchain started with Proof of Authority")
console.log("-".repeat(repeat_lines))
console.log("\Authorities selected...");
let authorities = Participants.nodes();
console.log("-".repeat(repeat_lines))

let blockchain = new Blockchain('poa');
console.log("Genesis Block 1 created")
console.log("-".repeat(repeat_lines))

console.log("-".repeat(repeat_lines))
console.log('\nFirst Transactions created...');
blockchain.createTransaction(new Transaction(Participants.accounts()[0][0],Participants.accounts()[1][0],100));
blockchain.createTransaction(new Transaction(Participants.accounts()[1][0],Participants.accounts()[0][0],50));

console.log("-".repeat(repeat_lines))
console.log('Creating Block 2...');
let authority = authorities[Math.floor(Math.random() * Participants.nodes().length)][0];
console.log('\nAuthority randomly chosen: ' + authority);
blockchain.generateBlock(authority);

console.log("-".repeat(repeat_lines))
console.log('\nNew Transactions created...');
blockchain.createTransaction(new Transaction(Participants.accounts()[1][0],Participants.accounts()[0][0],130));

console.log("-".repeat(repeat_lines))
console.log('Creating Block 3...');
authority = authorities[Math.floor(Math.random() * Participants.nodes().length)][0];
console.log('\nAuthority randomly chosen: ' + authority);
blockchain.generateBlock(authority);

/**
 * Validation check of the blockchain
 */
console.log("\n"+"-".repeat(repeat_lines)+"\n"+"-".repeat(repeat_lines)) 
console.log("Validation check...")
blockchain.validationCheck();

/**
 * Print balances
 */
console.log("\n"+"-".repeat(repeat_lines))
Participants.accounts().forEach(function(account){
    console.log('Balance of '+account[0]+':\t'+ blockchain.getBalanceOfAddress(account[0]))
});

/**
 * Print blockchain
 */ 
console.log("\n"+"-".repeat(repeat_lines)+"\n"+"-".repeat(repeat_lines)) 
console.log("Blockchain") 
console.log(JSON.stringify(blockchain.chain,'', 4));
console.log("-".repeat(repeat_lines)) 
console.log("Pending transactions") 
console.log(JSON.stringify(blockchain.pendingTransactions,'', 4));
