const SHA256 = require('crypto-js/sha256');

/**
 * Simple implementation of a proof of work consensus. 
 * In PoW, a miner generates a block by solving a mathmatical calculation. 
 * It is about creating a hash value with a certain number of zeros at the front.
 * The first miner is rewarded with coins for providing his computing power ("work") to the system. 
 * 
 * Example of PoW in real world: Bitcoin, Ethereum
 */
class ProofOfWork {
    constructor(block) {
        this.block = block; 
        this.block.hash = this.calculateHash();
    }
    
    /**
     * Method to calculate hash
     */
    calculateHash() {
        return SHA256(this.block.previousHash + this.block.timestamp + JSON.stringify(this.block.transactions) + this.block.nonce).toString();
    }
    
    generateBlock(difficulty) {
        while(this.block.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")) {
            this.block.nonce++;
            this.block.hash = this.calculateHash();
        }
        console.log("Block mined:"+this.block.hash);
        return this.block;
    }
}

module.exports = ProofOfWork;