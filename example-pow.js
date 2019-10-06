const Blockchain = require('./src/Blockchain.js');
const Transaction = require('./src/Transaction.js');
const Participants = require('./src/Participants.js');
  
repeat_lines = 50;

// Number of zeros at the beginning of the hash value
difficulty = 2;

console.log("-".repeat(repeat_lines))
console.log("New Blockchain started with Proof of Work")
console.log("-".repeat(repeat_lines))
let blockchain = new Blockchain('pow');
console.log("Genesis Block 1 created")
console.log("-".repeat(repeat_lines))

console.log('\nTransactions created...');
blockchain.createTransaction(new Transaction(Participants.accounts()[0][0],Participants.accounts()[1][0],100));
blockchain.createTransaction(new Transaction(Participants.accounts()[1][0],Participants.accounts()[0][0],50));

console.log("-".repeat(repeat_lines))
console.log('\nMining Block 2...');
blockchain.generateBlock(Participants.nodes()[0][0], difficulty);

console.log("-".repeat(repeat_lines))
console.log('\nMining Block 3...');
console.log('\nMiner of Block 2 is been rewarded...');
blockchain.generateBlock(Participants.nodes()[1][0], difficulty);

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
Participants.nodes().forEach(function(account){
    console.log('Balance of '+account[0]+':\t'+ blockchain.getBalanceOfAddress(account[0]))
});
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
