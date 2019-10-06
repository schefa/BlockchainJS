const SHA256 = require('crypto-js/sha256');

class ProofOfStake {
    constructor(block) {
        this.block = block;
        this.validators = [];
    }

    /**
     * Only for demonstration purposes. 
     * Usually a node has no balance in the begining.
     */
    static setBalanceForNodes(nodes) { 
        nodes.forEach(function(node){
            node[1] = 1000;
        });
        return nodes;
    }

    /**
     * In PoS, anybody can become a validator by paying a fee
     * 
     * @returns {Array} node with reduced balance
     */
    createValidator(node, stake) {
        this.validators.push([node[0], stake]);
        return [node[0], node[1] - stake];
    }

    calculateHash() {
        return SHA256(this.block.previousHash + this.block.timestamp + JSON.stringify(this.block.transactions) + this.block.validator).toString();
    }

    getValidatorWithMaxStake() {
        let maxStake = ["",0];
        this.validators.forEach(function(element){
            if(element[1] > maxStake[1]) {
                maxStake = element;
            }
        });
        return maxStake;
    }
    
    generateBlock() {
        this.block.hash = this.calculateHash();
        console.log("Block created by:"+this.block.validator);
        return this.block;
    }
}

module.exports = ProofOfStake;