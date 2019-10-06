const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(timestamp, transactions, previousHash = '') {
        this.block = 0;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    /**
     * Method to calculate hash for genesis block
     */
    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }
    
}

module.exports = Block;